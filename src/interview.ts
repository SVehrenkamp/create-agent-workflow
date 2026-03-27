import prompts from 'prompts';
import * as path from 'path';
import type { DetectionResult, ProjectConfig, Archetype } from './types.js';

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

  // Target directory
  const { targetDir } = await prompts({
    type: 'text',
    name: 'targetDir',
    message: 'Target directory:',
    initial: currentDir
  }, opts);

  // Archetype
  const archetypeChoices = [
    { title: 'Mobile App', value: 'mobile-app' as const },
    { title: 'Web App', value: 'web-app' as const },
    { title: 'CLI / Library', value: 'cli-library' as const }
  ];

  const { archetype } = await prompts({
    type: 'select',
    name: 'archetype',
    message: 'Project archetype:',
    choices: archetypeChoices,
    initial: detected.archetype ? archetypeChoices.findIndex(c => c.value === detected.archetype) : 0
  }, opts) as { archetype: Archetype };

  // Language choices based on archetype
  const languageMap: Record<Archetype, Array<{ title: string; value: string }>> = {
    'mobile-app': [
      { title: 'Swift', value: 'Swift' },
      { title: 'Kotlin', value: 'Kotlin' },
      { title: 'Dart', value: 'Dart' },
      { title: 'TypeScript', value: 'TypeScript' },
      { title: 'JavaScript', value: 'JavaScript' }
    ],
    'web-app': [
      { title: 'TypeScript', value: 'TypeScript' },
      { title: 'JavaScript', value: 'JavaScript' },
      { title: 'Python', value: 'Python' },
      { title: 'Ruby', value: 'Ruby' },
      { title: 'Elixir', value: 'Elixir' },
      { title: 'Go', value: 'Go' },
      { title: 'Rust', value: 'Rust' }
    ],
    'cli-library': [
      { title: 'TypeScript', value: 'TypeScript' },
      { title: 'JavaScript', value: 'JavaScript' },
      { title: 'Python', value: 'Python' },
      { title: 'Rust', value: 'Rust' },
      { title: 'Go', value: 'Go' },
      { title: 'Swift', value: 'Swift' },
      { title: 'Ruby', value: 'Ruby' }
    ]
  };

  const languageChoices = languageMap[archetype];

  const { language } = await prompts({
    type: 'select',
    name: 'language',
    message: 'Language:',
    choices: languageChoices,
    initial: detected.language ? Math.max(0, languageChoices.findIndex(c => c.value === detected.language)) : 0
  }, opts);

  // Framework choices based on archetype and language
  const frameworkChoices = getFrameworkChoices(archetype, language);

  const { framework } = await prompts({
    type: 'select',
    name: 'framework',
    message: 'Framework:',
    choices: frameworkChoices,
    initial: detected.framework ? Math.max(0, frameworkChoices.findIndex(c => c.value === detected.framework)) : 0
  }, opts);

  // Archetype-specific questions
  let backend = 'none';
  let hosting = 'none yet';

  if (archetype === 'mobile-app') {
    const resp = await prompts([
      {
        type: 'select',
        name: 'backend',
        message: 'Backend service:',
        choices: [
          { title: 'Supabase', value: 'Supabase' },
          { title: 'Firebase', value: 'Firebase' },
          { title: 'Custom API', value: 'custom API' },
          { title: 'None', value: 'none' }
        ]
      },
      {
        type: 'select',
        name: 'appStore',
        message: 'App store:',
        choices: [
          { title: 'App Store', value: 'App Store' },
          { title: 'Google Play', value: 'Google Play' },
          { title: 'Both', value: 'both' },
          { title: 'None yet', value: 'none yet' }
        ]
      }
    ], opts);
    backend = resp.backend;
    hosting = resp.appStore;
  } else if (archetype === 'web-app') {
    const resp = await prompts([
      {
        type: 'select',
        name: 'css',
        message: 'CSS/styling approach:',
        choices: [
          { title: 'Tailwind', value: 'Tailwind' },
          { title: 'CSS Modules', value: 'CSS Modules' },
          { title: 'styled-components', value: 'styled-components' },
          { title: 'Plain CSS', value: 'plain CSS' }
        ]
      },
      {
        type: 'select',
        name: 'backend',
        message: 'Backend service:',
        choices: [
          { title: 'Supabase', value: 'Supabase' },
          { title: 'Firebase', value: 'Firebase' },
          { title: 'Custom API', value: 'custom API' },
          { title: 'Self-hosted', value: 'self-hosted' },
          { title: 'None', value: 'none' }
        ]
      },
      {
        type: 'select',
        name: 'hosting',
        message: 'Hosting:',
        choices: [
          { title: 'Vercel', value: 'Vercel' },
          { title: 'Netlify', value: 'Netlify' },
          { title: 'AWS', value: 'AWS' },
          { title: 'Cloudflare', value: 'Cloudflare' },
          { title: 'Self-hosted', value: 'self-hosted' },
          { title: 'None yet', value: 'none yet' }
        ]
      }
    ], opts);
    backend = resp.backend;
    hosting = resp.hosting;
  } else {
    const resp = await prompts([
      {
        type: 'select',
        name: 'distribution',
        message: 'Distribution target:',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'PyPI', value: 'PyPI' },
          { title: 'crates.io', value: 'crates.io' },
          { title: 'Homebrew', value: 'Homebrew' },
          { title: 'Binary releases', value: 'binary releases' },
          { title: 'None yet', value: 'none yet' }
        ]
      },
      {
        type: 'select',
        name: 'projectType',
        message: 'Is this a CLI, library, or both?',
        choices: [
          { title: 'CLI', value: 'CLI' },
          { title: 'Library', value: 'library' },
          { title: 'Both', value: 'both' }
        ]
      }
    ], opts);
    hosting = resp.distribution;
  }

  // Common questions — linter, formatter, test framework
  const defaults = getToolDefaults(language);

  const toolResponses = await prompts([
    {
      type: 'text',
      name: 'linter',
      message: 'Linter:',
      initial: defaults.linter
    },
    {
      type: 'text',
      name: 'linterCommand',
      message: 'Linter command:',
      initial: defaults.linterCommand
    },
    {
      type: 'text',
      name: 'formatter',
      message: 'Formatter:',
      initial: defaults.formatter
    },
    {
      type: 'text',
      name: 'formatterCommand',
      message: 'Formatter command:',
      initial: defaults.formatterCommand
    },
    {
      type: 'text',
      name: 'testFramework',
      message: 'Test framework:',
      initial: defaults.testFramework
    },
    {
      type: 'text',
      name: 'testCommand',
      message: 'Test command:',
      initial: defaults.testCommand
    }
  ], opts);

  // CI/CD
  const { cicd } = await prompts({
    type: 'select',
    name: 'cicd',
    message: 'CI/CD:',
    choices: [
      { title: 'GitHub Actions', value: 'GitHub Actions' },
      { title: 'CircleCI', value: 'CircleCI' },
      { title: 'GitLab CI', value: 'GitLab CI' },
      { title: 'None yet', value: 'none yet' }
    ]
  }, opts);

  // Source directory
  let defaultSourceDir = 'src';
  if (language === 'Swift') {
    defaultSourceDir = archetype === 'mobile-app' ? projectName : 'Sources';
  } else if (language === 'Go') {
    defaultSourceDir = '.';
  }

  const { sourceDir } = await prompts({
    type: 'text',
    name: 'sourceDir',
    message: 'Source directory:',
    initial: defaultSourceDir
  }, opts);

  // UI paths
  const defaultUiPaths = getDefaultUiPaths(archetype, sourceDir);

  const { uiPaths: uiPathsStr } = await prompts({
    type: 'text',
    name: 'uiPaths',
    message: 'UI paths (comma-separated):',
    initial: defaultUiPaths.join(', ')
  }, opts);

  // OpenCode
  const { useOpenCode } = await prompts({
    type: 'confirm',
    name: 'useOpenCode',
    message: 'Do you also use OpenCode?',
    initial: false
  }, opts);

  return {
    projectName,
    targetDir,
    archetype,
    language,
    framework,
    linter: toolResponses.linter,
    linterCommand: toolResponses.linterCommand,
    formatter: toolResponses.formatter,
    formatterCommand: toolResponses.formatterCommand,
    testFramework: toolResponses.testFramework,
    testCommand: toolResponses.testCommand,
    backend,
    hosting,
    cicd,
    sourceDir,
    uiPaths: uiPathsStr.split(',').map((p: string) => p.trim()).filter((p: string) => p),
    useOpenCode
  };
}

function getFrameworkChoices(archetype: Archetype, language: string): Array<{ title: string; value: string }> {
  if (archetype === 'mobile-app') {
    if (language === 'Swift') return [{ title: 'SwiftUI', value: 'SwiftUI' }, { title: 'UIKit', value: 'UIKit' }];
    if (language === 'Kotlin') return [{ title: 'Compose', value: 'Compose' }, { title: 'Android Views', value: 'Android' }];
    if (language === 'Dart') return [{ title: 'Flutter', value: 'Flutter' }];
    return [{ title: 'React Native', value: 'React Native' }, { title: 'Expo', value: 'Expo' }, { title: 'Ionic', value: 'Ionic' }];
  }
  if (archetype === 'web-app') {
    if (language === 'TypeScript' || language === 'JavaScript') {
      return [
        { title: 'Next.js', value: 'Next.js' }, { title: 'React', value: 'React' },
        { title: 'Vue', value: 'Vue' }, { title: 'Angular', value: 'Angular' },
        { title: 'Svelte', value: 'Svelte' }, { title: 'Express', value: 'Express' },
        { title: 'Fastify', value: 'Fastify' }, { title: 'NestJS', value: 'NestJS' }
      ];
    }
    if (language === 'Python') return [{ title: 'Django', value: 'Django' }, { title: 'Flask', value: 'Flask' }, { title: 'FastAPI', value: 'FastAPI' }];
    if (language === 'Ruby') return [{ title: 'Rails', value: 'Rails' }, { title: 'Sinatra', value: 'Sinatra' }];
    if (language === 'Elixir') return [{ title: 'Phoenix', value: 'Phoenix' }];
  }
  return [{ title: 'none', value: 'none' }];
}

function getToolDefaults(language: string) {
  const defaults: Record<string, { linter: string; linterCommand: string; formatter: string; formatterCommand: string; testFramework: string; testCommand: string }> = {
    Swift: { linter: 'SwiftLint', linterCommand: 'swiftlint lint', formatter: 'SwiftFormat', formatterCommand: 'swiftformat .', testFramework: 'Swift Testing', testCommand: 'swift test' },
    TypeScript: { linter: 'ESLint', linterCommand: 'npx eslint .', formatter: 'Prettier', formatterCommand: 'npx prettier --check .', testFramework: 'Jest', testCommand: 'npx jest' },
    JavaScript: { linter: 'ESLint', linterCommand: 'npx eslint .', formatter: 'Prettier', formatterCommand: 'npx prettier --check .', testFramework: 'Jest', testCommand: 'npx jest' },
    Rust: { linter: 'Clippy', linterCommand: 'cargo clippy', formatter: 'rustfmt', formatterCommand: 'cargo fmt --check', testFramework: 'cargo test', testCommand: 'cargo test' },
    Go: { linter: 'golangci-lint', linterCommand: 'golangci-lint run', formatter: 'gofmt', formatterCommand: 'gofmt -l .', testFramework: 'go test', testCommand: 'go test ./...' },
    Python: { linter: 'ruff', linterCommand: 'ruff check', formatter: 'ruff format', formatterCommand: 'ruff format --check', testFramework: 'pytest', testCommand: 'pytest' },
    Kotlin: { linter: 'ktlint', linterCommand: 'ktlint', formatter: 'ktlint', formatterCommand: 'ktlint --format', testFramework: 'JUnit', testCommand: './gradlew test' },
    Dart: { linter: 'dart analyze', linterCommand: 'dart analyze', formatter: 'dart format', formatterCommand: 'dart format --set-exit-if-changed .', testFramework: 'flutter test', testCommand: 'flutter test' },
    Ruby: { linter: 'RuboCop', linterCommand: 'rubocop', formatter: 'RuboCop', formatterCommand: 'rubocop -a', testFramework: 'RSpec', testCommand: 'bundle exec rspec' },
    Elixir: { linter: 'Credo', linterCommand: 'mix credo', formatter: 'mix format', formatterCommand: 'mix format --check-formatted', testFramework: 'ExUnit', testCommand: 'mix test' }
  };
  return defaults[language] ?? { linter: 'none', linterCommand: '', formatter: 'none', formatterCommand: '', testFramework: 'none', testCommand: '' };
}

function getDefaultUiPaths(archetype: Archetype, sourceDir: string): string[] {
  if (archetype === 'mobile-app') return [`${sourceDir}/Views/`, `${sourceDir}/UI/`, `${sourceDir}/Screens/`];
  if (archetype === 'web-app') return ['src/components/', 'src/pages/', 'app/'];
  return [];
}
