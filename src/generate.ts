import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ProjectConfig, TemplateVariables } from './types.js';
import { resolveTemplate } from './variables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateFiles(config: ProjectConfig, variables: TemplateVariables): Promise<void> {
  // Resolve templates directory relative to the built output
  const templatesDir = path.resolve(__dirname, '../templates');

  const fileMapping = [
    { template: 'AGENTS.md', output: 'AGENTS.md' },
    { template: `agents-project/${config.archetype}.md`, output: 'AGENTS.project.md' },
    { template: 'CLAUDE.md', output: 'CLAUDE.md' },
    { template: 'agents/implementer.md', output: '.claude/agents/implementer.md' },
    { template: 'agents/reviewer.md', output: '.claude/agents/reviewer.md' },
    { template: 'agents/tester.md', output: '.claude/agents/tester.md' },
    { template: 'agents/pm.md', output: '.claude/agents/pm.md' },
    { template: 'commands/implement.md', output: '.claude/commands/implement.md' },
    { template: 'commands/pr.md', output: '.claude/commands/pr.md' },
    { template: 'commands/test.md', output: '.claude/commands/test.md' },
    { template: 'commands/deploy-check.md', output: '.claude/commands/deploy-check.md' },
    { template: 'commands/address-feedback.md', output: '.claude/commands/address-feedback.md' },
    { template: 'commands/pm.md', output: '.claude/commands/pm.md' },
    { template: 'skills/init-context/SKILL.md', output: '.claude/skills/init-context/SKILL.md' },
    { template: 'skills/triage-issue/SKILL.md', output: '.claude/skills/triage-issue/SKILL.md' },
    { template: 'docs/adr/0000-template.md', output: 'docs/adr/0000-template.md' },
    { template: 'docs/product-context.md', output: 'docs/product-context.md' },
    { template: 'github/PULL_REQUEST_TEMPLATE.md', output: '.github/PULL_REQUEST_TEMPLATE.md' }
  ];

  let createdCount = 0;
  let skippedCount = 0;

  for (const mapping of fileMapping) {
    const templatePath = path.join(templatesDir, mapping.template);
    const outputPath = path.join(config.targetDir, mapping.output);

    try {
      // Check if file already exists
      try {
        await fs.access(outputPath);
        console.log(`⚠ Skipped ${mapping.output} (already exists)`);
        skippedCount++;
        continue;
      } catch {
        // File doesn't exist, proceed with creation
      }

      // Read template file
      let template: string;
      try {
        template = await fs.readFile(templatePath, 'utf8');
      } catch (error) {
        console.log(`⚠ Skipped ${mapping.output} (template not found)`);
        skippedCount++;
        continue;
      }

      // Resolve variables
      const content = resolveTemplate(template, variables);

      // Create directory if needed
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      // Write file
      await fs.writeFile(outputPath, content, 'utf8');
      console.log(`✓ Created ${mapping.output}`);
      createdCount++;

    } catch (error) {
      console.log(`⚠ Failed to create ${mapping.output}: ${error}`);
      skippedCount++;
    }
  }

  // Create OpenCode symlinks if requested
  if (config.useOpenCode) {
    const symlinkMappings = [
      { source: '.claude/agents/implementer.md', target: '.opencode/agents/implementer.md' },
      { source: '.claude/agents/reviewer.md', target: '.opencode/agents/reviewer.md' },
      { source: '.claude/agents/tester.md', target: '.opencode/agents/tester.md' },
      { source: '.claude/agents/pm.md', target: '.opencode/agents/pm.md' }
    ];

    for (const symlink of symlinkMappings) {
      const sourcePath = path.join(config.targetDir, symlink.source);
      const targetPath = path.join(config.targetDir, symlink.target);

      try {
        // Check if source exists
        await fs.access(sourcePath);

        // Check if target already exists
        try {
          await fs.access(targetPath);
          console.log(`⚠ Skipped ${symlink.target} (already exists)`);
          skippedCount++;
          continue;
        } catch {
          // Target doesn't exist, proceed with symlink creation
        }

        // Create target directory
        const targetDir = path.dirname(targetPath);
        await fs.mkdir(targetDir, { recursive: true });

        // Create relative symlink
        const relativePath = path.relative(path.dirname(targetPath), sourcePath);
        await fs.symlink(relativePath, targetPath);
        console.log(`✓ Created ${symlink.target} → ${symlink.source}`);
        createdCount++;

      } catch (error) {
        console.log(`⚠ Failed to create symlink ${symlink.target}: ${error}`);
        skippedCount++;
      }
    }
  }

  console.log(`\nGenerated ${createdCount} files, skipped ${skippedCount}`);
}