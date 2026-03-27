# /implement - Issue to PR Orchestrator

Transform a GitHub issue into a working implementation through a two-phase process: planning and execution. This command ensures proper planning, stakeholder alignment, and quality implementation.

## Phase 1: Planning (MANDATORY CHECKPOINT)

### 1. Issue Analysis
- Read the assigned GitHub issue completely
- Understand all acceptance criteria and edge cases
- Identify any linked dependencies or related issues
- Check for existing PRs or attempts at implementation

### 2. Codebase Exploration
- Navigate the relevant code areas using the glob and grep tools
- Understand existing patterns, conventions, and architecture
- Identify files that will need modification
- Review related test files and testing patterns
- Check for similar implementations in the codebase

### 3. Implementation Planning
Create a structured plan including:

#### Summary
- Brief description of what will be implemented
- How this addresses the issue requirements

#### Technical Approach
- High-level implementation strategy
- Architecture patterns to follow
- Key algorithms or logic to implement

#### Files to Change
- List of files to create, modify, or delete
- Brief description of changes for each file
- Dependency order for changes

#### Testing Strategy
- Test types needed (unit, integration, E2E)
- Specific test cases to implement
- Mock strategies for external dependencies
- How to run and validate tests using: `{{test_command}}`

#### Impact Analysis
- Potential breaking changes or API modifications
- Performance implications
- Security considerations
- Backward compatibility concerns

#### TDD Assessment
- Which parts will follow red-green-refactor cycle
- Test-first vs test-after strategies for different components
- Integration points that need testing

#### ADR Assessment
- Whether an Architectural Decision Record is needed
- Architectural choices that need documentation
- Trade-offs and alternatives considered

#### Documentation Updates
- Which documentation files need updates
- New documentation that needs to be created
- Code comments and inline documentation needs

#### Branch and Commit Plan
- Branch name following convention: `{type}/{issue-number}-{short-description}`
- Planned commit sequence with descriptions
- Logical grouping of changes

### 4. MANDATORY CHECKPOINT
Present the complete plan and **WAIT FOR EXPLICIT APPROVAL** before proceeding to Phase 2. Do not begin implementation until the user confirms the plan.

## Phase 2: Execution (Post-Approval Only)

### 1. Branch Creation
```bash
git checkout -b {planned-branch-name}
```

### 2. Test-Driven Implementation
Follow the approved plan using TDD practices:

- **Red**: Write failing tests that describe desired behavior
- **Green**: Implement minimal code to make tests pass
- **Refactor**: Improve code while keeping tests green

Run tests frequently: `{{test_command}}`

### 3. Quality Checks During Development
Run these checks throughout implementation:

#### Linting
```bash
{{linter_command}}
```

#### Formatting
```bash
{{formatter_command}}
```

#### Testing
```bash
{{test_command}}
```

### 4. ADR Creation (If Planned)
If the plan identified need for an ADR:
- Use the template in `docs/adr/0000-template.md`
- Number sequentially and update ADR index
- Document context, options, decision, and consequences

### 5. Documentation Updates
Update documentation files identified in the plan:
- API documentation for interface changes
- User guides for behavior changes
- Architecture docs for design decisions

### 6. Final Implementation Review
Before creating PR, verify:
- All acceptance criteria from issue are met
- All planned tests are implemented and passing
- Code follows project conventions from AGENTS.project.md
- Documentation is updated as planned

### 7. PR Creation
Use the `/pr` command to create a quality-gated pull request

## Autonomous Failure Handling

During execution, handle failures autonomously:

### Test Failures
- Analyze failing tests and understand the failure reason
- Fix the implementation to make tests pass
- Re-run test suite to verify fixes
- Only escalate if fundamental approach needs revision

### Linting Issues
- Address lint violations by fixing code style issues
- Update code to meet project linting standards
- Re-run linting to verify fixes
- Avoid disabling lint rules without justification

### Reviewer Findings
- When `/pr` command reveals review issues, address them directly
- Fix blocking issues identified in code review checklist
- Re-run quality checks after fixes
- Update implementation based on review feedback

### Build or CI Failures
- Investigate build failures and dependency issues
- Fix configuration or dependency problems
- Re-run builds to verify fixes
- Update documentation if setup changes

## Success Criteria

Implementation is complete when:
- All acceptance criteria from the issue are satisfied
- All tests pass: `{{test_command}}`
- Lint is clean: `{{linter_command}}`
- Format is clean: `{{formatter_command}}`
- PR is created and passes initial review checks
- Documentation is updated as planned
- ADR is created if architectural decisions were made

## Error Escalation

Escalate to user when:
- Fundamental assumptions in the plan are incorrect
- Acceptance criteria are ambiguous or conflicting
- Technical blockers prevent implementation approach
- External dependencies are unavailable or broken
- Security concerns require stakeholder decision

---

*This command ensures thorough planning and quality implementation while maintaining autonomy for routine development tasks.*