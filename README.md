# create-agent-workflow

Scaffold a complete AI agent workflow framework into any project. One command gives you subagents, workflow commands, skills, and development conventions for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and [OpenCode](https://github.com/opencode-ai/opencode).

```bash
npx create-agent-workflow
```

## What is this?

When you work with AI coding agents, the quality of their output depends heavily on the context and conventions you give them. Without structure, agents make inconsistent decisions, skip tests, ignore your architecture, and produce PRs that need heavy rework.

`create-agent-workflow` solves this by generating a layered framework of guidelines, specialized subagents, workflow commands, and skills that automate the entire issue-to-PR lifecycle. It's like giving your AI agent a senior engineer's playbook on day one.

### What you get

After running the scaffolder, your project will have:

- **AGENTS.md** -- A universal 9-section workflow framework covering process, commits, testing, PRs, code review, documentation, ADRs, and subagent roles
- **AGENTS.project.md** -- Project-specific conventions tailored to your stack (language patterns, architecture, design system, testing approach)
- **4 specialized subagents** -- Implementer, Reviewer, Tester, and PM, each with detailed instructions and responsibilities
- **6 workflow commands** -- `/implement`, `/pr`, `/test`, `/deploy-check`, `/address-feedback`, and `/pm` that orchestrate the full development lifecycle
- **2 skills** -- `init-context` for an AI-powered product context interview, and `triage-issue` for automated issue quality audits
- **Documentation templates** -- ADR template, PR template, and a product context placeholder
- **CLAUDE.md** -- Pre-configured Claude Code settings referencing all generated files

## Requirements

- Node.js 18 or later
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (recommended) or any AI coding tool that reads markdown conventions

## Quick start

### 1. Run the scaffolder

In your project directory (new or existing):

```bash
npx create-agent-workflow
```

The CLI will:

1. **Detect your project** -- Scans for package.json, Cargo.toml, Podfile, go.mod, etc. and pre-populates answers
2. **Ask about your stack** -- Project archetype, language, framework, linter, formatter, test runner, backend, hosting, CI/CD
3. **Generate all files** -- Writes 18+ files with your tools and conventions filled in

### 2. Define your product context

Open your project in Claude Code and run:

```
/pm init-context
```

This launches an adaptive AI interview that asks about your product vision, target users, launch criteria, non-goals, and competitive positioning. The questions adapt based on your project type (mobile apps get asked about app store strategy, web apps about SaaS pricing, CLIs about distribution). The result is written to `docs/product-context.md`.

### 3. Start building

With the framework in place, use the workflow commands:

```
/implement <issue-url>    # Full issue-to-PR orchestrator
/test                     # TDD-aware test writing
/pr                       # Quality-gated PR creation
/deploy-check             # Pre-merge quality gate
/address-feedback         # Resolve PR review comments
/pm write-prd             # Write a product requirements doc
/pm breakdown             # Break an epic into phased issues
/pm triage                # Audit your entire backlog
```

## Supported project types

The scaffolder supports three archetypes, each generating tailored conventions:

### Mobile App

Detected via: `Package.swift`, `*.xcodeproj`, `Podfile`, `build.gradle`, `pubspec.yaml`

Languages: Swift, Kotlin, Dart, TypeScript (React Native), JavaScript

Generates conventions for: UI framework patterns, app store guidelines, offline support, push notifications, accessibility, platform-specific considerations

### Web App

Detected via: `package.json` (with Next.js, React, Vue, Angular, Svelte, Express, etc.), `Gemfile` (Rails), `mix.exs` (Phoenix), Python web frameworks

Languages: TypeScript, JavaScript, Python, Ruby, Elixir, Go, Rust

Generates conventions for: Component patterns, state management, SSR/SSG, CSS approach, SEO, Core Web Vitals, security, deployment

### CLI / Library

Detected via: `Cargo.toml`, `go.mod`, `pyproject.toml`, `package.json` (with `bin` field)

Languages: TypeScript, JavaScript, Python, Rust, Go, Swift, Ruby

Generates conventions for: Public API design, distribution strategy, CLI argument patterns, versioning, backward compatibility

## Generated file structure

```
your-project/
  AGENTS.md                              # Universal workflow framework
  AGENTS.project.md                      # Stack-specific conventions
  CLAUDE.md                              # Claude Code configuration
  .claude/
    agents/
      implementer.md                     # Branch creation, TDD, implementation
      reviewer.md                        # 12-item code review checklist
      tester.md                          # Test strategy and execution
      pm.md                              # Product planning and backlog management
    commands/
      implement.md                       # Issue-to-PR orchestrator
      pr.md                              # Quality-gated PR creation
      test.md                            # TDD test writing
      deploy-check.md                    # Pre-merge quality gate
      address-feedback.md                # PR feedback resolution
      pm.md                              # PM orchestrator (5 subcommands)
    skills/
      init-context/SKILL.md              # Product context interview
      triage-issue/SKILL.md              # Issue quality audit
  docs/
    adr/0000-template.md                 # ADR template (extended MADR)
    product-context.md                   # Product vision (filled by /pm init-context)
  .github/
    PULL_REQUEST_TEMPLATE.md             # PR template with quality checklist
```

If you use OpenCode, the scaffolder optionally creates symlinks:

```
  .opencode/
    agents/
      implementer.md -> ../../.claude/agents/implementer.md
      reviewer.md    -> ../../.claude/agents/reviewer.md
      tester.md      -> ../../.claude/agents/tester.md
      pm.md          -> ../../.claude/agents/pm.md
```

## How the framework works

### Layered guidelines

The framework uses a two-layer system:

1. **AGENTS.md** (universal) -- Process, commit conventions, testing policy, PR standards, code review checklist, documentation policy, ADR policy, and subagent role definitions. These apply to every project.

2. **AGENTS.project.md** (project-specific) -- Language conventions, framework patterns, architecture decisions, design system, and testing approaches specific to your stack. Generated as a skeleton with section headings and TODOs that you fill in as conventions emerge.

### Subagents

Each subagent is a role-specialized AI agent with focused responsibilities:

| Agent | Role | Key behaviors |
|-------|------|---------------|
| **Implementer** | Code development | Reads the issue, creates a branch, follows TDD, writes commits using conventional format, self-reviews against checklist |
| **Reviewer** | Code review | Evaluates PRs against 12-item quality checklist, produces structured pass/fail reports with actionable feedback |
| **Tester** | Test strategy | Selects appropriate test framework, follows TDD red/green/refactor, writes both positive and negative cases |
| **PM** | Product planning | Writes PRDs, breaks epics into phased issues, triages backlog, audits organizational hygiene |

### Workflow commands

Commands orchestrate multi-step workflows:

- **`/implement`** -- The primary command. Phase 1 reads the issue, explores the codebase, and proposes a plan with a mandatory approval checkpoint. Phase 2 executes autonomously: creates branch, implements with TDD, creates PR, handles failures.

- **`/pr`** -- Runs deploy checks (lint, format, test), spawns the reviewer subagent for self-review, fixes any findings, detects UI changes for screenshot reminders, and creates the PR via `gh`.

- **`/test`** -- Analyzes changed files, determines what needs testing, spawns the tester subagent, runs tests, iterates until green.

- **`/pm`** -- Five subcommands for product management: `write-prd`, `breakdown`, `refine`, `triage`, `organize`. All require explicit approval before making GitHub mutations.

### Template variables

Generated files use your specific tools -- not generic placeholders. For example, if you chose ESLint + Prettier + Jest, your deploy-check command will run `npx eslint .`, `npx prettier --check .`, and `npx jest`. If a tool wasn't specified, the framework inserts `# TODO: configure` comments so you know what to fill in.

## Customization

After scaffolding, all files belong to you. Edit freely:

- **Add conventions** -- Fill in the TODO sections in AGENTS.project.md as your patterns emerge
- **Modify commands** -- Adjust workflow commands to match your process
- **Add subagents** -- Create new `.claude/agents/*.md` files for specialized roles
- **Add commands** -- Create new `.claude/commands/*.md` files for project-specific workflows
- **Update checklist** -- Modify the 12-item review checklist in AGENTS.md to match your quality standards

The scaffolder will not overwrite existing files if you run it again in the same directory.

## Development

To work on the scaffolder itself:

```bash
git clone https://github.com/SVehrenkamp/create-agent-workflow.git
cd create-agent-workflow
npm install
npm run build
node dist/index.js  # Test locally
```

## Origin

This framework was extracted from a real-world agent workflow built for [Shallot](https://github.com/SVehrenkamp/shallot), an iOS recipe app. The patterns were developed across two PRs ([#69](https://github.com/SVehrenkamp/shallot/pull/69), [#70](https://github.com/SVehrenkamp/shallot/pull/70)) and proven effective for structured AI-assisted development before being generalized into this tool.

## License

MIT
