import * as fs from 'fs/promises';
import * as path from 'path';
import type { DetectionResult, Archetype, ToolDetection } from './types.js';

interface ToolConfig {
  files: string[];
  name: string;
  command: string;
}

async function detectTool(targetDir: string, files: string[], configs: ToolConfig[]): Promise<ToolDetection | null> {
  for (const config of configs) {
    for (const configFile of config.files) {
      if (files.includes(configFile)) {
        return {
          name: config.name,
          command: config.command,
          configFile: configFile
        };
      }
    }
  }
  return null;
}

async function detectSourceDir(targetDir: string, files: string[], language: string | null, projectName?: string): Promise<string | null> {
  try {
    // Check if src/ exists
    if (files.includes('src')) {
      const srcStat = await fs.stat(path.join(targetDir, 'src'));
      if (srcStat.isDirectory()) {
        return 'src';
      }
    }

    // If language is Swift and a directory matching the project name exists
    if (language === 'Swift' && projectName) {
      if (files.includes(projectName)) {
        const projectStat = await fs.stat(path.join(targetDir, projectName));
        if (projectStat.isDirectory()) {
          return projectName;
        }
      }
    }

    // Check if lib/ exists
    if (files.includes('lib')) {
      const libStat = await fs.stat(path.join(targetDir, 'lib'));
      if (libStat.isDirectory()) {
        return 'lib';
      }
    }

    // Check if app/ exists
    if (files.includes('app')) {
      const appStat = await fs.stat(path.join(targetDir, 'app'));
      if (appStat.isDirectory()) {
        return 'app';
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return null;
}

async function detectToolsFromPackageJson(packageJson: any, files: string[], result: DetectionResult): Promise<void> {
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Linter detection
  const linterConfigs: ToolConfig[] = [
    {
      files: ['.eslintrc', '.eslintrc.js', '.eslintrc.cjs', '.eslintrc.json', '.eslintrc.yml', '.eslintrc.yaml', 'eslint.config.js', 'eslint.config.mjs', 'eslint.config.ts'],
      name: 'ESLint',
      command: 'npx eslint .'
    }
  ];

  result.linter = await detectTool('', files, linterConfigs);

  // Check package.json for eslintConfig key
  if (!result.linter && packageJson.eslintConfig) {
    result.linter = {
      name: 'ESLint',
      command: 'npx eslint .',
      configFile: 'package.json'
    };
  }

  // Formatter detection
  const formatterConfigs: ToolConfig[] = [
    {
      files: ['.prettierrc', '.prettierrc.json', '.prettierrc.js', '.prettierrc.mjs', '.prettierrc.cjs', '.prettierrc.yml', '.prettierrc.yaml', 'prettier.config.js', 'prettier.config.mjs', 'prettier.config.cjs'],
      name: 'Prettier',
      command: 'npx prettier --check .'
    }
  ];

  result.formatter = await detectTool('', files, formatterConfigs);

  // Check package.json for prettier key
  if (!result.formatter && packageJson.prettier) {
    result.formatter = {
      name: 'Prettier',
      command: 'npx prettier --check .',
      configFile: 'package.json'
    };
  }

  // Test framework detection
  const testFrameworkConfigs: ToolConfig[] = [
    {
      files: ['jest.config.js', 'jest.config.mjs', 'jest.config.ts', 'jest.config.json'],
      name: 'Jest',
      command: 'npx jest'
    },
    {
      files: ['vitest.config.js', 'vitest.config.mjs', 'vitest.config.ts'],
      name: 'Vitest',
      command: 'npx vitest run'
    },
    {
      files: ['.mocharc.js', '.mocharc.json', '.mocharc.yml', '.mocharc.yaml'],
      name: 'Mocha',
      command: 'npx mocha'
    }
  ];

  result.testFramework = await detectTool('', files, testFrameworkConfigs);

  // Check package.json for jest key
  if (!result.testFramework && packageJson.jest) {
    result.testFramework = {
      name: 'Jest',
      command: 'npx jest',
      configFile: 'package.json'
    };
  }

  // Check devDependencies for test frameworks
  if (!result.testFramework) {
    if (allDeps.vitest) {
      result.testFramework = {
        name: 'Vitest',
        command: 'npx vitest run',
        configFile: 'package.json'
      };
    } else if (allDeps.jest) {
      result.testFramework = {
        name: 'Jest',
        command: 'npx jest',
        configFile: 'package.json'
      };
    }
  }
}

async function detectCICD(targetDir: string, files: string[]): Promise<ToolDetection | null> {
  // Check for GitHub Actions
  try {
    if (files.includes('.github')) {
      const githubStat = await fs.stat(path.join(targetDir, '.github'));
      if (githubStat.isDirectory()) {
        const githubDir = await fs.readdir(path.join(targetDir, '.github'));
        if (githubDir.includes('workflows')) {
          const workflowsStat = await fs.stat(path.join(targetDir, '.github', 'workflows'));
          if (workflowsStat.isDirectory()) {
            const workflowFiles = await fs.readdir(path.join(targetDir, '.github', 'workflows'));
            if (workflowFiles.some(file => file.endsWith('.yml') || file.endsWith('.yaml'))) {
              return {
                name: 'GitHub Actions',
                command: '',
                configFile: '.github/workflows/'
              };
            }
          }
        }
      }
    }
  } catch (error) {
    // Continue with other checks
  }

  // Check for CircleCI
  if (files.includes('.circleci')) {
    try {
      const circleciStat = await fs.stat(path.join(targetDir, '.circleci'));
      if (circleciStat.isDirectory()) {
        const circleciFiles = await fs.readdir(path.join(targetDir, '.circleci'));
        if (circleciFiles.includes('config.yml')) {
          return {
            name: 'CircleCI',
            command: '',
            configFile: '.circleci/config.yml'
          };
        }
      }
    } catch (error) {
      // Continue with other checks
    }
  }

  // Check for GitLab CI
  if (files.includes('.gitlab-ci.yml')) {
    return {
      name: 'GitLab CI',
      command: '',
      configFile: '.gitlab-ci.yml'
    };
  }

  return null;
}

export async function detectProject(targetDir: string): Promise<DetectionResult> {
  const result: DetectionResult = {
    language: null,
    framework: null,
    archetype: null,
    packageManager: null,
    hasGit: false,
    linter: null,
    formatter: null,
    testFramework: null,
    cicd: null,
    sourceDir: null
  };

  try {
    const files = await fs.readdir(targetDir);

    // Check for Git
    if (files.includes('.git')) {
      result.hasGit = true;
    }

    // Swift projects
    if (files.some(file => file.endsWith('.xcodeproj') || file.endsWith('.xcworkspace'))) {
      result.language = 'Swift';
      result.framework = 'SwiftUI';
      result.archetype = 'mobile-app';
      result.packageManager = 'spm';

      // Detect Swift tools
      await detectSwiftTools(targetDir, files, result);

      return result;
    }

    if (files.includes('Package.swift')) {
      result.language = 'Swift';
      result.framework = 'SwiftUI';
      result.archetype = 'mobile-app';
      result.packageManager = 'spm';

      // Detect Swift tools
      await detectSwiftTools(targetDir, files, result);

      return result;
    }

    if (files.includes('Podfile')) {
      result.language = 'Swift';
      result.framework = 'SwiftUI';
      result.archetype = 'mobile-app';
      result.packageManager = 'cocoapods';

      // Detect Swift tools
      await detectSwiftTools(targetDir, files, result);

      return result;
    }

    // Kotlin/Android projects
    if (files.includes('build.gradle') || files.includes('build.gradle.kts')) {
      result.language = 'Kotlin';
      result.framework = 'Android';
      result.archetype = 'mobile-app';
      result.packageManager = 'gradle';

      // Detect CI/CD and source directory
      result.cicd = await detectCICD(targetDir, files);
      result.sourceDir = await detectSourceDir(targetDir, files, result.language);

      return result;
    }

    // Flutter projects
    if (files.includes('pubspec.yaml')) {
      result.language = 'Dart';
      result.framework = 'Flutter';
      result.archetype = 'mobile-app';
      result.packageManager = 'pub';

      // Detect CI/CD and source directory
      result.cicd = await detectCICD(targetDir, files);
      result.sourceDir = await detectSourceDir(targetDir, files, result.language);

      return result;
    }

    // JavaScript/TypeScript projects
    if (files.includes('package.json')) {
      const packageJsonPath = path.join(targetDir, 'package.json');
      try {
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

        result.language = 'TypeScript';

        // Detect package manager
        if (files.includes('pnpm-lock.yaml')) {
          result.packageManager = 'pnpm';
        } else if (files.includes('yarn.lock')) {
          result.packageManager = 'yarn';
        } else if (files.includes('bun.lockb')) {
          result.packageManager = 'bun';
        } else {
          result.packageManager = 'npm';
        }

        // Check dependencies for framework detection
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        if (allDeps.next) {
          result.framework = 'Next.js';
          result.archetype = 'web-app';
        } else if (allDeps.react && !allDeps.next) {
          result.framework = 'React';
          result.archetype = 'web-app';
        } else if (allDeps.vue) {
          result.framework = 'Vue';
          result.archetype = 'web-app';
        } else if (allDeps['@angular/core']) {
          result.framework = 'Angular';
          result.archetype = 'web-app';
        } else if (allDeps.svelte) {
          result.framework = 'Svelte';
          result.archetype = 'web-app';
        } else if (allDeps.express) {
          result.framework = 'Express';
          result.archetype = 'web-app';
        } else if (allDeps.fastify) {
          result.framework = 'Fastify';
          result.archetype = 'web-app';
        } else if (allDeps['@nestjs/core']) {
          result.framework = 'NestJS';
          result.archetype = 'web-app';
        } else if (packageJson.bin) {
          result.framework = 'none';
          result.archetype = 'cli-library';
        } else {
          result.framework = 'none';
          result.archetype = 'cli-library';
        }

        // Detect tools from package.json
        await detectToolsFromPackageJson(packageJson, files, result);

        // Detect CI/CD
        result.cicd = await detectCICD(targetDir, files);

        // Detect source directory
        result.sourceDir = await detectSourceDir(targetDir, files, result.language, packageJson.name);

        return result;
      } catch (error) {
        // Failed to parse package.json, continue with other checks
      }
    }

    // Rust projects
    if (files.includes('Cargo.toml')) {
      result.language = 'Rust';
      result.framework = 'none';
      result.archetype = 'cli-library';
      result.packageManager = 'cargo';

      // Detect Rust tools
      await detectRustTools(targetDir, files, result);

      return result;
    }

    // Go projects
    if (files.includes('go.mod')) {
      result.language = 'Go';
      result.framework = 'none';
      result.archetype = 'cli-library';
      result.packageManager = 'go';

      // Detect Go tools
      await detectGoTools(targetDir, files, result);

      return result;
    }

    // Python projects
    if (files.includes('pyproject.toml') || files.includes('setup.py') || files.includes('requirements.txt')) {
      result.language = 'Python';
      result.archetype = 'cli-library';

      if (files.includes('pyproject.toml')) {
        result.packageManager = 'poetry';
      } else {
        result.packageManager = 'pip';
      }

      // Check for web frameworks
      if (files.includes('manage.py')) {
        result.framework = 'Django';
        result.archetype = 'web-app';
      } else {
        // Check requirements.txt or pyproject.toml for flask, fastapi
        try {
          if (files.includes('requirements.txt')) {
            const requirements = await fs.readFile(path.join(targetDir, 'requirements.txt'), 'utf8');
            if (requirements.includes('flask')) {
              result.framework = 'Flask';
              result.archetype = 'web-app';
            } else if (requirements.includes('fastapi')) {
              result.framework = 'FastAPI';
              result.archetype = 'web-app';
            } else {
              result.framework = 'none';
            }
          } else {
            result.framework = 'none';
          }
        } catch (error) {
          result.framework = 'none';
        }
      }

      // Detect Python tools
      await detectPythonTools(targetDir, files, result);

      return result;
    }

    // Ruby projects
    if (files.includes('Gemfile')) {
      result.language = 'Ruby';
      result.packageManager = 'bundler';

      try {
        const gemfile = await fs.readFile(path.join(targetDir, 'Gemfile'), 'utf8');
        if (gemfile.includes('rails')) {
          result.framework = 'Rails';
          result.archetype = 'web-app';
        } else {
          result.framework = 'none';
          result.archetype = 'cli-library';
        }
      } catch (error) {
        result.framework = 'none';
        result.archetype = 'cli-library';
      }

      // Detect Ruby tools
      await detectRubyTools(targetDir, files, result);

      return result;
    }

    // Elixir projects
    if (files.includes('mix.exs')) {
      result.language = 'Elixir';
      result.packageManager = 'mix';

      try {
        const mixExs = await fs.readFile(path.join(targetDir, 'mix.exs'), 'utf8');
        if (mixExs.includes('phoenix')) {
          result.framework = 'Phoenix';
          result.archetype = 'web-app';
        } else {
          result.framework = 'none';
          result.archetype = 'cli-library';
        }
      } catch (error) {
        result.framework = 'none';
        result.archetype = 'cli-library';
      }

      // Detect Elixir tools
      await detectElixirTools(targetDir, files, result);

      return result;
    }

  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  // If no specific language was detected, still try to detect CI/CD and source directory
  if (!result.language) {
    try {
      const files = await fs.readdir(targetDir);
      result.cicd = await detectCICD(targetDir, files);
      result.sourceDir = await detectSourceDir(targetDir, files, null);
    } catch (error) {
      // Ignore errors
    }
  }

  return result;
}

async function detectSwiftTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // SwiftLint
  if (files.includes('.swiftlint.yml') || files.includes('.swiftlint.yaml')) {
    result.linter = {
      name: 'SwiftLint',
      command: 'swiftlint lint',
      configFile: '.swiftlint.yml'
    };
  }

  // SwiftFormat
  if (files.includes('.swiftformat')) {
    result.formatter = {
      name: 'SwiftFormat',
      command: 'swiftformat .',
      configFile: '.swiftformat'
    };
  }

  // Swift Testing (check for Package.swift with testing target)
  if (files.includes('Package.swift')) {
    result.testFramework = {
      name: 'Swift Testing',
      command: 'swift test',
      configFile: 'Package.swift'
    };
  }

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language, path.basename(targetDir));
}

async function detectRustTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // Clippy (always available with Rust)
  result.linter = {
    name: 'Clippy',
    command: 'cargo clippy',
    configFile: 'Cargo.toml'
  };

  // rustfmt
  if (files.includes('rustfmt.toml') || files.includes('.rustfmt.toml')) {
    result.formatter = {
      name: 'rustfmt',
      command: 'cargo fmt --check',
      configFile: 'rustfmt.toml'
    };
  } else {
    result.formatter = {
      name: 'rustfmt',
      command: 'cargo fmt --check',
      configFile: 'Cargo.toml'
    };
  }

  // cargo test
  result.testFramework = {
    name: 'cargo test',
    command: 'cargo test',
    configFile: 'Cargo.toml'
  };

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language);
}

async function detectGoTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // golangci-lint
  if (files.includes('.golangci.yml') || files.includes('.golangci.yaml')) {
    result.linter = {
      name: 'golangci-lint',
      command: 'golangci-lint run',
      configFile: '.golangci.yml'
    };
  }

  // gofmt (always available with Go)
  result.formatter = {
    name: 'gofmt',
    command: 'gofmt -l .',
    configFile: 'go.mod'
  };

  // go test
  result.testFramework = {
    name: 'go test',
    command: 'go test ./...',
    configFile: 'go.mod'
  };

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language);
}

async function detectPythonTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // Ruff
  if (files.includes('ruff.toml') || files.includes('pyproject.toml')) {
    result.linter = {
      name: 'ruff',
      command: 'ruff check',
      configFile: files.includes('ruff.toml') ? 'ruff.toml' : 'pyproject.toml'
    };
    result.formatter = {
      name: 'ruff format',
      command: 'ruff format --check',
      configFile: files.includes('ruff.toml') ? 'ruff.toml' : 'pyproject.toml'
    };
  }

  // pytest
  if (files.includes('pytest.ini') || files.includes('pyproject.toml') || files.includes('tox.ini')) {
    result.testFramework = {
      name: 'pytest',
      command: 'pytest',
      configFile: files.includes('pytest.ini') ? 'pytest.ini' : 'pyproject.toml'
    };
  }

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language);
}

async function detectRubyTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // RuboCop
  if (files.includes('.rubocop.yml')) {
    result.linter = {
      name: 'RuboCop',
      command: 'rubocop',
      configFile: '.rubocop.yml'
    };
    result.formatter = {
      name: 'RuboCop',
      command: 'rubocop -a',
      configFile: '.rubocop.yml'
    };
  }

  // RSpec
  if (files.includes('.rspec')) {
    result.testFramework = {
      name: 'RSpec',
      command: 'bundle exec rspec',
      configFile: '.rspec'
    };
  }

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language);
}

async function detectElixirTools(targetDir: string, files: string[], result: DetectionResult): Promise<void> {
  // Credo
  if (files.includes('.credo.exs')) {
    result.linter = {
      name: 'Credo',
      command: 'mix credo',
      configFile: '.credo.exs'
    };
  }

  // mix format (always available with Elixir)
  result.formatter = {
    name: 'mix format',
    command: 'mix format --check-formatted',
    configFile: 'mix.exs'
  };

  // ExUnit (always available with Elixir)
  result.testFramework = {
    name: 'ExUnit',
    command: 'mix test',
    configFile: 'mix.exs'
  };

  result.cicd = await detectCICD(targetDir, files);
  result.sourceDir = await detectSourceDir(targetDir, files, result.language);
}