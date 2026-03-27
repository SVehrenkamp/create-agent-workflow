#!/usr/bin/env node

import { execSync } from 'child_process';
import { detectProject } from './detect.js';
import { conductInterview } from './interview.js';
import { buildVariables } from './variables.js';
import { generateFiles } from './generate.js';

async function main() {
  try {
    // Banner
    console.log('create-agent-workflow v0.2.0');
    console.log();

    // Detect project
    console.log('Detecting project...');
    const detected = await detectProject(process.cwd());

    // Print detection summary
    console.log(`  Language:    ${detected.language || 'not detected'}`);
    console.log(`  Framework:   ${detected.framework || 'not detected'}`);
    console.log(`  Archetype:   ${detected.archetype || 'not detected'}`);

    if (detected.linter) {
      console.log(`  Linter:      ${detected.linter.name} (${detected.linter.configFile})`);
    } else {
      console.log('  Linter:      not detected');
    }

    if (detected.formatter) {
      console.log(`  Formatter:   ${detected.formatter.name} (${detected.formatter.configFile})`);
    } else {
      console.log('  Formatter:   not detected');
    }

    if (detected.testFramework) {
      console.log(`  Tests:       ${detected.testFramework.name} (${detected.testFramework.configFile})`);
    } else {
      console.log('  Tests:       not detected');
    }

    if (detected.cicd) {
      console.log(`  CI/CD:       ${detected.cicd.name} (${detected.cicd.configFile})`);
    } else {
      console.log('  CI/CD:       not detected');
    }

    console.log('  Backend:     not detected');
    console.log('  Hosting:     not detected');
    console.log();

    // Interview
    const config = await conductInterview(detected);

    // Build variables
    const variables = buildVariables(config);

    // Generate files
    console.log('\nGenerating files...');
    await generateFiles(config, variables);

    // Install community skills
    const skills = [
      'mattpocock/skills/write-a-prd',
      'mattpocock/skills/prd-to-plan',
      'mattpocock/skills/prd-to-issues',
      'mattpocock/skills/grill-me',
      'mattpocock/skills/tdd'
    ];

    console.log('\nInstalling skills...');
    for (const skill of skills) {
      const skillName = skill.split('/').pop();
      try {
        execSync(`npx skills@latest add ${skill}`, { stdio: 'pipe', timeout: 30000 });
        console.log(`  ✓ ${skillName}`);
      } catch {
        console.log(`  ⚠ Failed to install ${skillName} (run manually: npx skills@latest add ${skill})`);
      }
    }

    // Next steps - contextual based on what's missing
    const toolsMissing = [
      !config.linter || config.linter === '',
      !config.formatter || config.formatter === '',
      !config.testFramework || config.testFramework === '',
      config.backend === 'none',
      config.hosting === 'none',
      !config.cicd || config.cicd === ''
    ].some(Boolean);

    console.log('\nNext steps:');
    console.log('  1. Open your project in Claude Code');

    if (toolsMissing) {
      console.log('  2. Run /pm init to configure missing tools and define your product context');
    } else {
      console.log('  2. Run /pm init to define your product context');
    }

    console.log('  3. Start working with /implement <issue-url>');

  } catch (error) {
    if (error instanceof Error && error.message === 'cancelled') {
      console.log('\nCancelled.');
      process.exit(0);
    } else {
      console.error('\nError:', error);
      process.exit(1);
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\nCancelled.');
  process.exit(0);
});

main();