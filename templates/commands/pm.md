# /pm - Product Management Orchestrator

Execute product management tasks including PRD creation, epic breakdown, issue refinement, backlog triage, and organizational auditing. All GitHub mutations require explicit approval before execution.

## Command Usage

```bash
/pm {subcommand} [arguments]
```

**Subcommands:**
- `init` - Two-phase project setup: configure tools, then establish product context
- `write-prd` - Interview user and create Product Requirements Document
- `breakdown` - Break down epic into implementation issues
- `refine` - Audit and improve a single issue
- `triage` - Review entire backlog for quality and organization
- `organize` - Audit organizational structures (labels, milestones, epics)

## Subcommand: init

A two-phase setup command that finishes project configuration after the CLI scaffolder runs.

### Phase 1: Tool Configuration

#### 1. Scan for Configuration Placeholders
- Read `AGENTS.project.md`, `CLAUDE.md`, and all generated command files
- Scan for `# TODO: configure` placeholders — these indicate tools that weren't auto-detected during CLI setup
- Collect all unique placeholder variables across all files

#### 2. Interactive Tool Selection
For each missing tool category (linter, formatter, test framework, backend, hosting, CI/CD), ask the user:
- Which tool they want to use (suggest options appropriate for the project's language/framework, read from `AGENTS.project.md`)
- What command to run it (suggest a sensible default based on the chosen tool)

Example prompt:
```
I found the following unconfigured tools:

1. Linter — # TODO: configure linter
   Suggestions for {language}: eslint, biome, oxlint
   Which tool? What command? (default: `npx eslint .`)

2. Formatter — # TODO: configure formatter
   Suggestions for {language}: prettier, biome
   Which tool? What command? (default: `npx prettier --check .`)

3. Test Framework — # TODO: configure test_framework
   Suggestions for {language}: vitest, jest, mocha
   Which tool? What command? (default: `npx vitest run`)
```

#### 3. Apply Configuration
- Update the generated files: replace `# TODO: configure <variable>` with the chosen tool/command in ALL files that reference it (commands, CLAUDE.md, PR template, etc.)
- Show a summary of what was configured:
```markdown
## Tool Configuration Summary

| Category | Tool | Command | Files Updated |
|----------|------|---------|---------------|
| Linter | eslint | `npx eslint .` | CLAUDE.md, deploy-check.md, pr.md |
| Formatter | prettier | `npx prettier --check .` | CLAUDE.md, deploy-check.md |
| Test Framework | vitest | `npx vitest run` | CLAUDE.md, test.md, implement.md |
```

If no TODOs are found, skip to Phase 2 with a message: "All tools already configured. Moving to product context..."

### Phase 2: Product Context Interview

After tool setup, flow directly into the product context interview (the content currently in the `init-context` skill):

#### 1. Read Project Context
- Read `AGENTS.project.md` to understand archetype and stack
- Review any existing `docs/product-context.md` if present

#### 2. Conduct Adaptive Interview
Branch questions based on the project archetype:

**ALL archetypes:**
- Vision: What is this product and what problem does it solve?
- Target user: Who is the primary user? What are their pain points?
- Current state: Where is the project today? (greenfield, MVP, mature)
- Launch criteria: What must be true before v1.0 / first release?
- Non-goals: What is explicitly out of scope?
- Constraints: Technical, timeline, budget, regulatory limitations?

**mobile-app archetype additions:**
- App store strategy: iOS-only, Android-only, or both? When?
- Platform scope: Native features required? (camera, GPS, push, biometrics)
- Device targets: Phone, tablet, watch? Minimum OS versions?

**web-app archetype additions:**
- SaaS vs tool: Is this a SaaS product, internal tool, or standalone app?
- Pricing: Free, freemium, paid? Pricing model?
- Multi-tenancy: Single tenant or multi-tenant? Isolation requirements?
- SEO: Is organic search a meaningful acquisition channel?

**cli-library archetype additions:**
- Distribution: npm, pip, brew, binary release, other?
- Shell compatibility: bash, zsh, fish, PowerShell? Cross-platform?
- Versioning: Semantic versioning? Breaking change policy?

**All archetypes (continued):**
- Competitive landscape: What alternatives exist? How is this different?
- Key differentiators: What is the single most compelling reason to use this over alternatives?
- Monetization: How does (or will) this make money? Is it open source?

#### 3. Write Product Context
Compile interview answers into structured output for `docs/product-context.md`:
```markdown
# Product Context: {project_name}

## Vision
[1-2 sentence product vision]

## Target User
[User persona, pain points, and jobs-to-be-done]

## Current State
[Where the project is today]

## Launch Criteria
[Concrete criteria for v1.0 / first release]

## Non-Goals
[Explicitly out of scope items]

## Constraints
[Technical, timeline, budget, regulatory]

## Competitive Landscape
[Alternatives and positioning]

## Key Differentiators
[What makes this unique]

## Monetization
[Business model]

## Archetype-Specific Context
[Additional context from archetype-specific questions]
```

### Checkpoint
Before writing `docs/product-context.md`, present the full draft and get explicit user approval.

### Rules
- Never modify files without showing what will change
- If the user wants to skip Phase 2, respect that (they can run `/pm init-context` later)
- Use the language/framework from `AGENTS.project.md` to suggest appropriate tools in Phase 1
- If `docs/product-context.md` already exists, warn the user and ask whether to overwrite or merge

## Subcommand: write-prd

Create a comprehensive PRD through user interview and file as an epic issue.

### Process

#### 1. User Interview
Attempt to use `grill-me` skill if available:
```
Use grill-me skill to interview user about:
- Product vision and goals
- Target user and use cases
- Success metrics and acceptance criteria
- Non-goals and constraints
- Technical requirements
```

**Fallback Interview (if grill-me unavailable):**
Conduct inline interview covering:

**Product Vision**
- What problem does this solve?
- Who is the target user?
- What's the desired outcome?
- How does this align with overall product strategy?

**Requirements Gathering**
- What are the core features needed?
- What are the edge cases to consider?
- What are the performance requirements?
- What are the security considerations?

**Constraints and Context**
- What are the timeline constraints?
- What are the resource limitations?
- What technologies must be used/avoided?
- What are the explicit non-goals?

#### 2. PRD Drafting
Attempt to use `write-a-prd` skill if available for structured PRD creation.

**Fallback PRD Structure:**
```markdown
# PRD: {Feature Name}

## Problem Statement
[Clear description of problem being solved]

## Target User
[Detailed user persona and use cases]

## Goals & Success Metrics
[Measurable outcomes and success criteria]

## Functional Requirements
[Detailed feature specifications]

## Non-Functional Requirements
[Performance, security, usability requirements]

## User Stories & Acceptance Criteria
[Detailed user stories with testable criteria]

## Non-Goals
[Explicitly what this PRD does NOT cover]

## Risks & Mitigation
[Technical and product risks with mitigation strategies]

## Open Questions
[Unresolved questions requiring stakeholder input]
```

#### 3. Alignment Check
Verify PRD aligns with `docs/product-context.md`:
- Check against stated non-goals
- Ensure target user alignment
- Verify constraint adherence
- Flag any conflicts or concerns

#### 4. Epic Issue Creation
**REQUIRES APPROVAL**: Present complete epic issue for approval:
```markdown
Title: [Epic] {Feature Name}
Labels: epic, type: enhancement
Milestone: [appropriate milestone]

Body: [Complete PRD content]
```

Wait for explicit approval before creating issue.

## Subcommand: breakdown

Decompose an epic issue into implementable child issues.

### Process

#### 1. Epic Analysis
- Read the complete epic issue
- Understand requirements and acceptance criteria
- Identify technical complexity and dependencies
- Review related codebase areas

#### 2. Implementation Planning
Attempt to use `prd-to-plan` skill if available for tracer-bullet planning.

**Fallback Planning:**
- Break down epic into logical implementation phases
- Identify minimum viable features for each phase
- Plan integration points and dependencies
- Consider testing and documentation needs

#### 3. Issue Decomposition
Attempt to use `prd-to-issues` skill if available.

**Fallback Issue Creation:**
Create child issues following these patterns:

**Feature Implementation Issues**
```markdown
Title: Implement {specific feature}
Labels: type: enhancement, area: {relevant area}, phase-{number}
Epic: #{epic-number}
Milestone: [inherited from epic]

## Summary
[Clear description of specific feature to implement]

## Acceptance Criteria
- [ ] [Specific testable criterion]
- [ ] [Specific testable criterion]

## Implementation Notes
[Technical guidance and considerations]

## Testing Requirements
[Specific testing needs]

## Dependencies
[Links to prerequisite issues]
```

#### 4. Issue Presentation
**REQUIRES APPROVAL**: Present ALL proposed issues for batch approval:
```markdown
## Epic Breakdown: {Epic Title}

### Proposed Issues (X total)

#### Phase 1 (X issues)
1. **Issue Title 1** - [Brief description]
2. **Issue Title 2** - [Brief description]

#### Phase 2 (X issues)
1. **Issue Title 3** - [Brief description]

#### Phase 3 (X issues)
1. **Issue Title 4** - [Brief description]

### Labels to Apply
- All: type: enhancement, epic: #{epic-number}
- Phase-specific: phase-1, phase-2, phase-3
- Area-specific: area: {relevant areas}

### Milestone Assignment
All inherit milestone: {milestone name}

### Dependencies
[List any inter-issue dependencies]

**Proceed with creating these issues? (Explicit approval required)**
```

## Subcommand: refine

Audit a single issue using triage checks and propose improvements.

### Process

#### 1. Issue Audit
Attempt to use `triage-issue` skill if available.

**Fallback Triage (9-Point Checklist):**

1. **Acceptance Criteria Quality**
   - Are criteria clear and testable?
   - Are they complete and comprehensive?
   - Do they avoid implementation details?

2. **Type Label Presence**
   - Is appropriate type label present? (enhancement/bug/refactor)
   - Does label match the issue content?

3. **Area Labels**
   - Are relevant area labels applied?
   - Do they match the files/components affected?

4. **Epic Label Alignment**
   - If part of epic, is epic label present?
   - Does it match the correct epic number?

5. **Phase Label Assignment**
   - Is appropriate phase label assigned?
   - Does phase make sense for dependencies?

6. **Milestone Assignment**
   - Is milestone assigned appropriately?
   - Does timeline make sense?

7. **Description Quality**
   - Is problem statement clear?
   - Is sufficient context provided?
   - Are assumptions documented?

8. **Duplicate Detection**
   - Scan for similar open issues
   - Check for duplicate functionality

9. **Scope Assessment**
   - Is scope appropriate for single issue?
   - Flag if too large (8+ AC, 4+ areas)

#### 2. Improvement Proposals
For each failed check, propose specific fixes:
```markdown
## Issue Audit: #{issue-number}

### Audit Results (X/9 passing)

| Check | Status | Proposed Fix |
|-------|--------|--------------|
| Acceptance Criteria | ✅/❌ | [Specific improvement] |
| Type Label | ✅/❌ | [Label to add/change] |
| Area Labels | ✅/❌ | [Labels to add] |
| Epic Label | ✅/❌ | [Epic alignment fix] |
| Phase Label | ✅/❌ | [Phase assignment] |
| Milestone | ✅/❌ | [Milestone recommendation] |
| Description | ✅/❌ | [Content improvements] |
| Duplicates | ✅/❌ | [Duplicate handling] |
| Scope | ✅/❌ | [Scope reduction plan] |

### Proposed Changes
[Detailed list of improvements with rationale]
```

#### 3. Individual Fix Approval
**REQUIRES PER-FIX APPROVAL**: Request approval for each proposed fix before applying.

## Subcommand: triage

Review entire open backlog for quality and consistency issues.

### Process

#### 1. Backlog Iteration
For each open issue, run the 9-point triage checklist.

#### 2. Consolidated Reporting
```markdown
## Backlog Triage Report

### Summary Statistics
- Total Issues: X
- Passing All Checks: Y
- Requiring Fixes: Z
- Average Score: X/9

### Issues by Quality Score
- 9/9 (Perfect): X issues
- 7-8/9 (Good): Y issues
- 4-6/9 (Needs Work): Z issues
- 0-3/9 (Poor): W issues

### Common Issues Found
- Missing type labels: X issues
- Unclear acceptance criteria: Y issues
- Missing milestone: Z issues
- Scope too large: W issues

### Recommended Actions
1. [Priority action with issue count]
2. [Priority action with issue count]

### Issues Needing Immediate Attention
[List of issues with critical problems]
```

#### 3. Bulk Fix Planning
Identify opportunities for bulk fixes:
- Consistent label applications
- Milestone assignments for related issues
- Epic relationships to establish

## Subcommand: organize

Audit organizational structures for consistency.

### Process

#### 1. Label Audit
- Review all labels for consistency
- Identify unused or redundant labels
- Check for naming convention adherence
- Verify color coding and descriptions

#### 2. Milestone Review
- Check milestone dates and scope
- Identify overloaded or empty milestones
- Verify alignment with project timeline
- Assess completion rates

#### 3. Epic Relationship Audit
- Verify epic-child relationships
- Check for orphaned issues
- Identify missing epic labels
- Validate phase sequencing

#### 4. Organizational Report
```markdown
## Organizational Audit Report

### Label Health
- Total Labels: X
- Unused Labels: Y
- Inconsistent Naming: Z
- Missing Descriptions: W

### Milestone Health
- Total Milestones: X
- Overdue: Y
- Empty: Z
- Completion Rate: X%

### Epic Health
- Total Epics: X
- Orphaned Children: Y
- Missing Relationships: Z
- Phase Inconsistencies: W

### Recommendations
[Prioritized list of organizational improvements]
```

## Common Patterns

### Approval Requirements
ALL GitHub mutations require explicit approval:
- Creating issues
- Modifying issue content
- Adding/removing labels
- Updating milestones
- Closing issues

### Error Handling
- Graceful degradation when external skills unavailable
- Clear error messages for permission issues
- Retry mechanisms for API failures
- Escalation paths for complex decisions

### Quality Standards
- All created content follows project conventions
- Issues include complete acceptance criteria
- Labels and milestones are applied consistently
- Documentation is clear and actionable

---

*Product management requires careful planning and stakeholder alignment. Always get explicit approval before making changes to GitHub state.*