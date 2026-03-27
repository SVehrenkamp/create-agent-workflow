export type Archetype = "mobile-app" | "web-app" | "cli-library";

export interface ToolDetection {
  name: string;
  command: string;
  configFile: string;
}

export interface DetectionResult {
  language: string | null;
  framework: string | null;
  archetype: Archetype | null;
  packageManager: string | null;
  hasGit: boolean;
  linter: ToolDetection | null;
  formatter: ToolDetection | null;
  testFramework: ToolDetection | null;
  cicd: ToolDetection | null;
  sourceDir: string | null;
}

export interface ProjectConfig {
  projectName: string;
  targetDir: string;
  archetype: Archetype;
  language: string;
  framework: string;
  linter: string;
  linterCommand: string;
  formatter: string;
  formatterCommand: string;
  testFramework: string;
  testCommand: string;
  backend: string;
  hosting: string;
  cicd: string;
  sourceDir: string;
  uiPaths: string[];
  useOpenCode: boolean;
}

export interface TemplateVariables {
  [key: string]: string;
}

export interface GeneratedFile {
  relativePath: string;
  content: string;
  isSymlink?: boolean;
  symlinkTarget?: string;
}
