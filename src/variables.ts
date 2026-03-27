import type { ProjectConfig, TemplateVariables } from './types.js';

export function buildVariables(config: ProjectConfig): TemplateVariables {
  return {
    project_name: config.projectName,
    language: config.language,
    framework: config.framework,
    archetype: config.archetype,
    linter: config.linter,
    linter_command: config.linterCommand,
    formatter: config.formatter,
    formatter_command: config.formatterCommand,
    test_framework: config.testFramework,
    test_command: config.testCommand,
    backend: config.backend,
    hosting: config.hosting,
    cicd: config.cicd,
    source_dir: config.sourceDir,
    ui_paths: config.uiPaths.join(', ')
  };
}

export function resolveTemplate(template: string, variables: TemplateVariables): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
    const value = variables[variableName];
    if (!value || value === 'none' || value === '') {
      return `# TODO: configure ${variableName}`;
    }
    return value;
  });
}