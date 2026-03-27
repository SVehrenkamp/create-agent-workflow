#!/usr/bin/env node

import { detectProject } from './detect.js';
import { conductInterview } from './interview.js';
import { buildVariables } from './variables.js';
import { generateFiles } from './generate.js';

async function main() {
  try {
    // Banner
    console.log('create-agent-workflow v0.1.0');
    console.log('Generate an AI agent workflow framework for your project\n');

    const currentDir = process.cwd();

    // Detect project
    console.log('Detecting project type...');
    const detected = await detectProject(currentDir);

    if (detected.language || detected.framework || detected.archetype) {
      const detectedParts = [
        detected.language,
        detected.framework,
        detected.archetype
      ].filter(Boolean);
      console.log(`Detected: ${detectedParts.join(' / ')}\n`);
    } else {
      console.log('No project type detected\n');
    }

    // Interview
    console.log('Please answer a few questions about your project:\n');
    const config = await conductInterview(detected);

    // Build variables
    const variables = buildVariables(config);

    // Generate files
    console.log('\nGenerating files...');
    await generateFiles(config, variables);

    // Next steps
    console.log('\nNext steps:');
    console.log('1. Open your project in Claude Code');
    console.log('2. Run /pm init-context to define your product context');
    console.log('3. Start working with /implement <issue-url>');

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