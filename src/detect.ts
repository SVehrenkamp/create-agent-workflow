import * as fs from 'fs/promises';
import * as path from 'path';
import type { DetectionResult, Archetype } from './types.js';

export async function detectProject(targetDir: string): Promise<DetectionResult> {
  const result: DetectionResult = {
    language: null,
    framework: null,
    archetype: null,
    packageManager: null,
    hasGit: false
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
      return result;
    }

    if (files.includes('Package.swift')) {
      result.language = 'Swift';
      result.framework = 'SwiftUI';
      result.archetype = 'mobile-app';
      result.packageManager = 'spm';
      return result;
    }

    if (files.includes('Podfile')) {
      result.language = 'Swift';
      result.framework = 'SwiftUI';
      result.archetype = 'mobile-app';
      result.packageManager = 'cocoapods';
      return result;
    }

    // Kotlin/Android projects
    if (files.includes('build.gradle') || files.includes('build.gradle.kts')) {
      result.language = 'Kotlin';
      result.framework = 'Android';
      result.archetype = 'mobile-app';
      result.packageManager = 'gradle';
      return result;
    }

    // Flutter projects
    if (files.includes('pubspec.yaml')) {
      result.language = 'Dart';
      result.framework = 'Flutter';
      result.archetype = 'mobile-app';
      result.packageManager = 'pub';
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
      return result;
    }

    // Go projects
    if (files.includes('go.mod')) {
      result.language = 'Go';
      result.framework = 'none';
      result.archetype = 'cli-library';
      result.packageManager = 'go';
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

      return result;
    }

  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return result;
}