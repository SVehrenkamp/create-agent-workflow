# Plan: create-agent-workflow

> Source: Design decisions from grill-me session (2026-03-26), extracted from SVehrenkamp/shallot PRs #69 and #70

## Architectural decisions

Durable decisions that apply across all phases:

- **Package name**: `create-agent-workflow` on npm, invoked via `npx create-agent-workflow`
- **Entry point**: `src/index.ts` compiled to `dist/index.js`, registered as bin in package.json
- **Template system**: Template files in `templates/` within the package, `{{variable}}` placeholders resolved by string replacement at generation time. Unknown values become `# TODO: configure <variable>` comments.
- **Archetypes**: Three project archetypes drive interview branching and template selection: `mobile-app`, `web-app`, `cli-library`
- **Detection model**: Map of marker files (package.json, Cargo.toml, Podfile, go.mod, etc.) to `{language, framework, archetype}` tuples, used to pre-populate interview answers
- **Generated file layout**:
  ```
  AGENTS.md
  AGENTS.project.md
  CLAUDE.md
  .claude/agents/{implementer,reviewer,tester,pm}.md
  .claude/commands/{implement,pr,test,deploy-check,address-feedback,pm}.md
  .claude/skills/init-context/SKILL.md
  .claude/skills/triage-issue/SKILL.md
  docs/adr/0000-template.md
  docs/product-context.md
  .github/PULL_REQUEST_TEMPLATE.md
  ```
- **Skill strategy**: Custom skills (init-context, triage-issue) published to npm and installed during CLI flow. Built-in Claude skills (grill-me, write-a-prd, prd-to-plan, prd-to-issues) referenced by name with inline prompt fallbacks.
- **Tool stance**: Claude-first. Optional symlinks to `.opencode/agents/` if user confirms OpenCode usage.
- **No upgrade path**: Generated files are owned by the user. No manifest, no lockfile.

---

## Phase 1: Skeleton CLI generates AGENTS.md

**User stories**: As a developer, I can run `npx create-agent-workflow` in any directory and get a valid, generalized AGENTS.md that defines the universal agent workflow framework.

### What to build

The thinnest possible end-to-end slice: an npm package with a TypeScript CLI entry point that asks a single question ("What's your project name?"), then generates a generalized AGENTS.md file. The AGENTS.md is extracted from Shallot's version with all Shallot-specific content removed — it contains the 9-section universal framework (process, branch/commit conventions, testing policy, PR standards, code review checklist, documentation policy, ADR policy, subagent roles, project-specific config pointer). This proves the full scaffolding pipeline: npm package → CLI prompt → template → file output.

### Acceptance criteria

- [ ] `npm init` project with TypeScript, `prompts` dependency, bin entry pointing to `dist/index.js`
- [ ] `src/index.ts` entry point that prompts for project name and target directory
- [ ] Detects if AGENTS.md already exists in target directory, warns before overwriting
- [ ] Generalized AGENTS.md template (Shallot-specific references removed, subagent section references all 4 roles)
- [ ] File written to target directory with project name substituted
- [ ] Runnable via `npx create-agent-workflow` (or `node dist/index.js` locally)
- [ ] `tsconfig.json` and `npm run build` produce working output

---

## Phase 2: Project detection and archetype-aware AGENTS.project.md

**User stories**: As a developer with an existing project, I can run the scaffolder and it auto-detects my stack and generates a skeleton AGENTS.project.md with relevant section headings for my technology choices.

### What to build

Add project marker scanning that looks for known files (package.json, Podfile, Cargo.toml, go.mod, pyproject.toml, etc.) and infers language, framework, and archetype. Present the detected archetype to the user for confirmation or override. Based on the confirmed archetype, generate a skeleton AGENTS.project.md with section headings and TODOs appropriate for the detected stack (e.g., "Swift Conventions" for iOS, "React Conventions" for a Next.js project). Sections contain light guidance and TODOs rather than deep opinionated defaults.

### Acceptance criteria

- [ ] Detection module scans target directory for marker files and maps to `{language, framework, archetype}`
- [ ] Supports at minimum: Swift/iOS, TypeScript/Next.js, TypeScript/Node, Rust, Go, Python as detectable stacks
- [ ] Prompts user to confirm or override detected archetype (Mobile App / Web App / CLI-Library)
- [ ] AGENTS.project.md template per archetype with stack-specific section headings
- [ ] Sections include brief guidance and `<!-- TODO -->` markers for user customization
- [ ] Pre-existing detection results carry forward to later phases (stored in a context object)

---

## Phase 3: Technical interview and template-resolved commands + subagents

**User stories**: As a developer, after archetype selection I answer a short set of technical questions (linter, formatter, test runner, backend, hosting, CI/CD) and the scaffolder generates all subagent definitions and workflow commands with my specific tools filled in.

### What to build

Extend the CLI with an archetype-branching technical interview. Each archetype triggers different follow-up questions (e.g., Mobile App asks about platform and UI framework; Web App asks about SSR/SPA and CSS approach; CLI-Library asks about distribution target). All archetypes share common questions for linter, formatter, test runner, backend, hosting, and CI/CD. Collected answers populate a template variable map. Generate all 4 subagent definitions (implementer, reviewer, tester, PM) generalized from Shallot's versions. Generate all 6 workflow commands (implement, pr, test, deploy-check, address-feedback, pm) with `{{variable}}` placeholders resolved from the interview answers. Unknown or skipped tools produce `# TODO: configure` placeholders.

### Acceptance criteria

- [ ] Archetype-specific question branches for all 3 archetypes
- [ ] Common questions: linter, formatter, test runner, backend service, hosting provider, CI/CD platform
- [ ] Template variable map populated from detection + interview answers
- [ ] 4 subagent templates generalized from Shallot (no Shallot-specific references)
- [ ] 6 command templates generalized from Shallot with `{{variable}}` placeholders
- [ ] Variable resolution replaces known values, leaves `# TODO` for unknowns
- [ ] Generated commands are valid markdown that Claude Code can parse as commands
- [ ] Generated subagents follow the consistent structure: frontmatter, startup checklist, responsibilities, output format, rules

---

## Phase 4: CLAUDE.md, docs, PR template, and optional OpenCode symlinks

**User stories**: As a developer, after scaffolding I have a complete, self-consistent file tree — CLAUDE.md references the right files, docs templates are in place, and if I use OpenCode, symlinks are set up.

### What to build

Generate CLAUDE.md that references AGENTS.md and AGENTS.project.md, lists all generated commands and skills, and includes placeholder sections for MCP servers and hooks. Generate the docs directory with the ADR template (extended MADR format) and a product-context.md placeholder that explains what it is and tells the user to run `/pm init-context`. Generate .github/PULL_REQUEST_TEMPLATE.md with the quality gate checklist adapted to the user's stack. Ask if the user also uses OpenCode; if yes, create symlinks from `.opencode/agents/` to `.claude/agents/`.

### Acceptance criteria

- [ ] CLAUDE.md references AGENTS.md, AGENTS.project.md, and lists all commands and skills
- [ ] CLAUDE.md includes placeholder sections for MCP servers and hooks
- [ ] `docs/adr/0000-template.md` generated with extended MADR format
- [ ] `docs/product-context.md` placeholder with instructions to run `/pm init-context`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` with quality gate checklist using resolved stack tools
- [ ] OpenCode prompt: if yes, symlinks `.opencode/agents/*.md` → `.claude/agents/*.md`
- [ ] All cross-references between generated files are valid (no broken links)

---

## Phase 5: Custom skills and skill installation

**User stories**: As a developer, after scaffolding I can open Claude Code, run `/pm init-context`, and get an adaptive AI-powered interview that produces my product-context.md. I can also run triage-issue against any GitHub issue.

### What to build

Build two custom Claude Code skills and add a skill installation step to the CLI flow. The **init-context** skill conducts an adaptive product context interview — questions branch based on archetype (SaaS gets pricing/multi-tenancy, CLI gets distribution/shell compatibility, mobile gets app store/platform). It writes the result to `docs/product-context.md`. The **triage-issue** skill runs 9 quality checks against a GitHub issue (acceptance criteria, labels, epic, phase, milestone, description, duplicates, scope). Both are installed from npm during the CLI flow. Commands that reference built-in Claude skills (grill-me, write-a-prd, etc.) include inline prompt fallbacks for when those skills aren't available.

### Acceptance criteria

- [ ] init-context skill: adaptive question tree branching on archetype, outputs product-context.md
- [ ] triage-issue skill: 9-check quality audit generalized from Shallot's version
- [ ] CLI installs both skills into `.claude/skills/` during scaffolding
- [ ] `/pm` command's subcommands (write-prd, breakdown) include inline fallback prompts for when grill-me/write-a-prd/prd-to-plan/prd-to-issues are unavailable
- [ ] Skills are publishable as npm packages
- [ ] End-to-end: scaffold → open Claude Code → `/pm init-context` → product-context.md written

---

## Phase 6: Cross-archetype testing and polish

**User stories**: As a developer, the scaffolder works reliably for iOS, Next.js, and Rust CLI projects. The README explains what it does and how to use it. The package is ready to publish.

### What to build

Test the complete scaffolding flow across all 3 archetypes with real-world project structures. Fix edge cases: unusual directory layouts, missing markers, conflicting signals (e.g., both package.json and Cargo.toml). Add sensible defaults and blanks for stacks not explicitly templated. Write a README covering installation, usage, what gets generated, and how to customize. Set up npm publish configuration (package.json metadata, .npmignore, prepublish build script).

### Acceptance criteria

- [ ] End-to-end test: scaffold into a directory with a Swift/iOS project structure
- [ ] End-to-end test: scaffold into a directory with a Next.js project structure
- [ ] End-to-end test: scaffold into a directory with a Rust CLI project structure
- [ ] End-to-end test: scaffold into an empty directory (greenfield)
- [ ] Graceful handling of conflicting project markers
- [ ] README.md with usage, generated file tree, customization guide
- [ ] package.json ready for `npm publish` (name, version, description, keywords, license, bin, files)
- [ ] `.npmignore` excludes source/templates/tests from published package appropriately
