# {{project_name}} — Claude Code Configuration

This file configures Claude Code for {{project_name}}, a {{archetype}} built with {{language}} and {{framework}}.

## Guidelines

Read and follow these files in order:

1. **AGENTS.md** — Universal agent workflow framework (process, commits, testing, PRs, review, docs, ADRs, subagent roles)
2. **AGENTS.project.md** — Project-specific conventions ({{language}}, {{framework}}, architecture, testing patterns)
3. **docs/product-context.md** — Product vision, target user, and strategic context

## Subagents

| Agent | File | Purpose |
|-------|------|---------|
| Implementer | `.claude/agents/implementer.md` | Branch creation, TDD implementation, issue-to-code conversion |
| Reviewer | `.claude/agents/reviewer.md` | Code review against 12-item quality checklist |
| Tester | `.claude/agents/tester.md` | Test strategy and implementation with {{test_framework}} |
| PM | `.claude/agents/pm.md` | PRD writing, epic breakdown, backlog triage and organization |

## Commands

| Command | File | Purpose |
|---------|------|---------|
| `/implement` | `.claude/commands/implement.md` | Full issue-to-PR orchestrator with mandatory planning phase |
| `/pr` | `.claude/commands/pr.md` | Quality-gated PR creation with automated review |
| `/test` | `.claude/commands/test.md` | TDD-aware test writing and execution |
| `/deploy-check` | `.claude/commands/deploy-check.md` | Pre-merge quality gate with comprehensive checks |
| `/address-feedback` | `.claude/commands/address-feedback.md` | Systematic PR review feedback resolution |
| `/pm` | `.claude/commands/pm.md` | PM orchestrator (write-prd, breakdown, refine, triage, organize) |

## Skills

| Skill | File | Purpose |
|-------|------|---------|
| `init-context` | `.claude/skills/init-context/SKILL.md` | Adaptive product context interview based on project archetype |
| `triage-issue` | `.claude/skills/triage-issue/SKILL.md` | 9-check issue quality audit with actionable improvements |

## Quality Tools

This project uses the following quality tools:

- **Linter**: {{linter}} (run: `{{linter_command}}`)
- **Formatter**: {{formatter}} (run: `{{formatter_command}}`)
- **Tests**: {{test_framework}} (run: `{{test_command}}`)

## MCP Servers

<!-- TODO: configure MCP servers for enhanced capabilities -->
<!-- Consider {{backend}} MCP server integration for database/API operations -->

## Hooks

<!-- TODO: configure Claude Code hooks for automated behaviors -->
<!-- Example: run deploy-check before every PR creation -->
<!-- Example: auto-format code on save -->

---

*This configuration enables AI-driven development workflows while maintaining high quality standards and project-specific conventions.*
