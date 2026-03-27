import prompts from 'prompts';
import * as path from 'path';
import type { DetectionResult, ProjectConfig, Archetype, ToolDetection } from './types.js';

export async function conductInterview(detected: DetectionResult): Promise<ProjectConfig> {
  const onCancel = () => { throw new Error('cancelled'); };
  const opts = { onCancel };

  const currentDir = process.cwd();
  const dirName = path.basename(currentDir);

  // Project name
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name:',
    initial: dirName
  }, opts);

  // Archetype confirmation
  const archetypeChoices = [
    { title: 'Mobile App', value: 'mobile-app' as const },
    { title: 'Web App', value: 'web-app' as const },
    { title: 'CLI / Library', value: 'cli-library' as const }
  ];

  const archetypeMessage = detected.archetype
    ? `Archetype (detected: ${detected.archetype}):`
    : 'Project archetype:';

  const { archetype } = await prompts({
    type: 'select',
    name: 'archetype',
    message: archetypeMessage,
    choices: archetypeChoices,
    initial: detected.archetype ? archetypeChoices.findIndex(c => c.value === detected.archetype) : 0
  }, opts) as { archetype: Archetype };

  // OpenCode
  const { useOpenCode } = await prompts({
    type: 'confirm',
    name: 'useOpenCode',
    message: 'Do you also use OpenCode?',
    initial: false
  }, opts);

  // Build config from detected values
  const language = detected.language || getDefaultLanguageForArchetype(archetype);
  const framework = detected.framework || getDefaultFrameworkForArchetype(archetype, language);
  const sourceDir = detected.sourceDir || getDefaultSourceDir(archetype, language, projectName);

  return {
    projectName,
    targetDir: currentDir,
    archetype,
    language,
    framework,
    linter: detected.linter?.name || '',
    linterCommand: detected.linter?.command || '',
    formatter: detected.formatter?.name || '',
    formatterCommand: detected.formatter?.command || '',
    testFramework: detected.testFramework?.name || '',
    testCommand: detected.testFramework?.command || '',
    backend: 'none',
    hosting: 'none',
    cicd: detected.cicd?.name || '',
    sourceDir,
    uiPaths: getDefaultUiPaths(archetype, sourceDir),
    useOpenCode
  };
}

function getDefaultLanguageForArchetype(archetype: Archetype): string {
  switch (archetype) {
    case 'mobile-app':
      return 'Swift';
    case 'web-app':
      return 'TypeScript';
    case 'cli-library':
      return 'TypeScript';
    default:
      return 'TypeScript';
  }
}

function getDefaultFrameworkForArchetype(archetype: Archetype, language: string): string {
  if (archetype === 'mobile-app') {
    if (language === 'Swift') return 'SwiftUI';
    if (language === 'Kotlin') return 'Compose';
    if (language === 'Dart') return 'Flutter';
    return 'React Native';
  }
  if (archetype === 'web-app') {
    if (language === 'TypeScript' || language === 'JavaScript') return 'React';
    if (language === 'Python') return 'Django';
    if (language === 'Ruby') return 'Rails';
    if (language === 'Elixir') return 'Phoenix';
    if (language === 'Go') return 'none';
    if (language === 'Rust') return 'none';
  }
  return 'none';
}

function getDefaultSourceDir(archetype: Archetype, language: string, projectName: string): string {
  if (language === 'Swift') {
    return archetype === 'mobile-app' ? projectName : 'Sources';
  }
  if (language === 'Go') {
    return '.';
  }
  return 'src';
}

function getDefaultUiPaths(archetype: Archetype, sourceDir: string): string[] {
  if (archetype === 'mobile-app') return [`${sourceDir}/Views/`, `${sourceDir}/UI/`, `${sourceDir}/Screens/`];
  if (archetype === 'web-app') return ['src/components/', 'src/pages/', 'app/'];
  return [];
}
