# Agent Workflow Framework

This document defines the universal AI agent workflow for issue-to-PR development. These guidelines apply to all projects regardless of language, framework, or architecture.

## 1. Process

### Issue-to-PR Workflow

Follow this sequence for every feature, bug fix, or improvement:

1. **Read & Understand** — Thoroughly read the GitHub issue, understand acceptance criteria, and identify any linked dependencies
2. **Explore Codebase** — Navigate the relevant code areas, understand existing patterns, and identify files that need modification
3. **Propose Plan** — Create a structured implementation plan including approach, files to change, testing strategy, and potential architectural decisions
4. **Checkpoint** — Present the plan to stakeholders and get explicit approval before beginning implementation
5. **Implement** — Follow test-driven development (TDD) practices, create branch, write tests, implement changes, ensure all tests pass
6. **Test & Validate** — Run full test suite, perform manual testing against acceptance criteria, check for regressions
7. **Create PR** — Submit pull request with descriptive title, summary, test plan, and link to original issue

### Core Principles

- **Always create a plan before coding** — No implementation without an approved plan
- **Never push without tests** — All changes must include appropriate test coverage
- **One issue per PR** — Keep pull requests focused and reviewable
- **Fail fast** — Surface issues early through automated checks and reviews

## 2. Branch & Commit Conventions

### Branch Naming

Use the pattern: `{type}/{issue-number}-{short-description}`

Examples:
- `feat/123-add-user-authentication`
- `fix/456-resolve-memory-leak`
- `refactor/789-extract-api-client`
- `docs/012-update-deployment-guide`

### Commit Messages

Follow Conventional Commits specification:

```
{type}({scope}): {description}

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` — New feature for the user
- `fix` — Bug fix for the user
- `refactor` — Code change that neither fixes bug nor adds feature
- `test` — Adding missing tests or correcting existing tests
- `docs` — Documentation changes
- `chore` — Updating build tasks, package manager configs, etc.

**Rules:**
- Keep commits atomic — one logical change per commit
- Use present tense ("add" not "added")
- Keep first line under 72 characters
- Include issue number in footer: `Closes #123`

## 3. Testing Policy

### Test-Driven Development (TDD)

For all new code, follow the red-green-refactor cycle:

1. **Red** — Write a failing test that describes the desired behavior
2. **Green** — Write the minimal code to make the test pass
3. **Refactor** — Improve the code while keeping tests green

### Existing Code

When modifying existing code:
- Add tests before making changes if coverage is insufficient
- Ensure all existing tests continue to pass
- Add regression tests for bugs being fixed

### PR Requirements

- No skipped or disabled tests without explicit justification
- Test coverage should not decrease
- All tests must pass before merge
- Include both positive and negative test cases

## 4. PR Standards

### PR Title

Use the same format as commit messages:
`{type}({scope}): {description}`

Keep under 72 characters and be descriptive of the change's impact.

### PR Body

Include these sections:

```markdown
## Summary
Brief description of what this PR accomplishes and why.

## Changes
- Bulleted list of specific changes made
- Include any breaking changes

## Test Plan
- How the changes were tested
- Manual testing steps if applicable
- Any edge cases considered

## Screenshots
If UI changes, include before/after screenshots.
```

### PR Requirements

- Link to the original issue
- Keep PRs focused — one issue per PR
- Ensure CI checks pass before requesting review
- Include appropriate labels for area and type
- Request reviews from relevant team members

## 5. Code Review Checklist

Every PR must pass this 12-point checklist before merge:

1. **Tests Pass** — All automated tests pass without failures or skips
2. **Lint Clean** — Code passes all linting rules without warnings
3. **Format Clean** — Code follows consistent formatting standards
4. **No Regressions** — Existing functionality continues to work
5. **Acceptance Criteria Met** — All requirements from the issue are satisfied
6. **Documentation Updated** — Any behavior changes are reflected in docs
7. **ADR Created** — Architectural decisions are documented if applicable
8. **Accessibility Reviewed** — UI changes meet accessibility standards
9. **Design System Compliance** — UI follows established design patterns
10. **Error Handling** — Appropriate error handling and recovery mechanisms
11. **Security Review** — No security vulnerabilities introduced
12. **Performance** — No significant performance regressions

## 6. Documentation Policy

### When to Update Docs

Update documentation when changes affect:
- Public APIs or interfaces
- User-facing behavior
- Configuration or setup procedures
- Architecture or design patterns
- Troubleshooting or debugging processes

### Doc-Code Mapping

Maintain a mapping in AGENTS.project.md that links code areas to documentation files. This ensures doc updates aren't forgotten during implementation.

### Documentation Types

- **API Documentation** — Generated from code comments
- **User Guides** — Step-by-step instructions for end users
- **Developer Guides** — Setup, architecture, and contribution guidelines
- **ADRs** — Architectural decision records for design choices

## 7. ADR Policy

### When to Create ADRs

Create an Architectural Decision Record (ADR) for:
- Technology choices (frameworks, libraries, tools)
- Architecture patterns and design approaches
- Data models and database schema decisions
- API design and integration patterns
- Security and performance trade-offs

### ADR Process

1. Use the extended MADR template in `docs/adr/0000-template.md`
2. Number ADRs sequentially starting from 0001
3. Include context, options considered, decision rationale, and consequences
4. Submit ADR as part of the PR that implements the decision
5. Update the ADR index in `docs/adr/README.md`

### ADR Lifecycle

- **Proposed** — Under discussion and review
- **Accepted** — Approved and being implemented
- **Deprecated** — No longer recommended for new development
- **Superseded** — Replaced by a newer ADR

## 8. Subagent Roles

The framework includes four specialized AI subagents:

- **Implementer** — Branch creation, TDD implementation, code development following project conventions
- **Reviewer** — Code review against the 12-point checklist, quality assurance, actionable feedback
- **Tester** — Test strategy, test implementation, test-driven development support
- **PM** — Product planning, issue breakdown, backlog management, organizational auditing

Each subagent has detailed instructions in `.claude/agents/{role}.md`.

## 9. Project-Specific Configuration

This framework is universal. Project-specific conventions, patterns, and configurations are defined in:

- **AGENTS.project.md** — Language conventions, architecture patterns, testing approaches
- **docs/product-context.md** — Product vision, target users, launch criteria, constraints
- **.claude/commands/** — Custom command definitions for project workflows

Refer to these files for project-specific guidance that supplements this universal framework.

---

*This framework ensures consistent, high-quality development practices across all AI agent workflows while maintaining flexibility for project-specific requirements.*