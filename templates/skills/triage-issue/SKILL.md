# Issue Quality Triage Skill

Systematically audit GitHub issues against a comprehensive 9-point quality checklist and propose specific improvements for each failing criterion.

## Overview

This skill performs detailed quality auditing of GitHub issues to ensure they meet project standards for clarity, completeness, and organization. Each issue is evaluated against 9 specific criteria with actionable improvement recommendations.

## 9-Point Quality Checklist

### 1. Acceptance Criteria Quality

**Pass Criteria:**
- Acceptance criteria are present and clearly written
- Each criterion is testable and verifiable
- Criteria cover both positive and negative cases
- Success conditions are unambiguous
- Criteria avoid implementation details

**Common Failures:**
- Missing acceptance criteria entirely
- Vague criteria like "should work well"
- Implementation-focused rather than outcome-focused
- Missing edge cases or error conditions

**Assessment Questions:**
- Can a developer know when they're done?
- Can a tester verify each criterion objectively?
- Are both happy path and error cases covered?
- Do criteria focus on "what" not "how"?

### 2. Type Label Present

**Pass Criteria:**
- Issue has appropriate type label applied
- Label accurately reflects the nature of work
- Only one primary type label is used

**Valid Type Labels:**
- `enhancement` - New features or improvements
- `bug` - Defects or incorrect behavior
- `refactor` - Code restructuring without behavior change
- `docs` - Documentation updates
- `chore` - Maintenance tasks, dependency updates

**Common Failures:**
- No type label applied
- Multiple conflicting type labels
- Wrong label for the type of work

### 3. Area Labels Present

**Pass Criteria:**
- Relevant area labels are applied
- Labels match the components/files being affected
- Multiple area labels used when work spans areas

**Typical Area Labels:**
- `area: auth` - Authentication and authorization
- `area: ui` - User interface components
- `area: api` - Backend API and services
- `area: database` - Data layer and schemas
- `area: testing` - Test infrastructure and tools
- `area: docs` - Documentation systems

**Assessment Method:**
- Review issue description for affected components
- Check if proposed changes span multiple areas
- Verify labels match actual technical scope

### 4. Epic Label Alignment

**Pass Criteria:**
- If issue is part of an epic, epic label is present
- Epic label references correct epic issue number
- Non-epic issues don't have epic labels

**Epic Label Format:**
- `epic: #123` where 123 is the epic issue number

**Assessment Questions:**
- Does issue mention being part of a larger initiative?
- Is the epic label format correct?
- Does the referenced epic actually exist?
- Is this issue actually independent of any epic?

### 5. Phase Label Assignment

**Pass Criteria:**
- Issue has appropriate phase label for dependency sequencing
- Phase aligns with epic breakdown (if applicable)
- Dependencies are respected in phase assignment

**Phase Label Examples:**
- `phase-1` - Foundation/infrastructure work
- `phase-2` - Core features depending on phase-1
- `phase-3` - Advanced features or polish
- `phase-discovery` - Research or spike work

**Assessment Factors:**
- Technical dependencies between issues
- Logical implementation sequence
- Team capacity and parallel work opportunities

### 6. Milestone Assignment

**Pass Criteria:**
- Issue is assigned to appropriate milestone
- Milestone timeline is realistic for issue scope
- Issue fits within milestone scope and capacity

**Assessment Questions:**
- Is the milestone deadline achievable?
- Does issue align with milestone theme/goals?
- Is the milestone overloaded with work?
- Are dependencies in earlier milestones?

### 7. Description Quality

**Pass Criteria:**
- Clear problem statement or feature description
- Sufficient context for understanding needs
- Background information for decision making
- Links to related issues, PRs, or documentation

**Quality Indicators:**
- Answers "why" this work is needed
- Provides context for prioritization decisions
- Includes relevant user scenarios or use cases
- References supporting documentation or research

**Common Failures:**
- Sparse description with minimal context
- Unclear problem statement
- Missing motivation or justification
- No links to related work

### 8. Duplicate Detection

**Pass Criteria:**
- Issue is not a duplicate of existing open issues
- Related issues are linked rather than duplicated
- Work isn't redundant with recent PRs

**Detection Method:**
- Search open issues for similar titles/descriptions
- Look for overlapping acceptance criteria
- Check for similar functionality in different words
- Review recently closed issues and PRs

**Common Patterns:**
- Same feature requested with different wording
- Bug reports for the same underlying issue
- Overlapping scope between multiple issues

### 9. Scope Assessment

**Pass Criteria:**
- Issue scope is appropriate for single implementation effort
- Work can be completed by one developer in reasonable time
- Issue is focused on single logical change

**Scope Red Flags:**
- 8+ acceptance criteria (likely too large)
- Affects 4+ different areas (likely too broad)
- Describes multiple distinct features
- Timeline estimate exceeds sprint length

**Scope Indicators:**
- Number and complexity of acceptance criteria
- Number of area labels required
- Estimated effort and timeline
- Dependencies and integration complexity

## Audit Process

### 1. Issue Analysis
```markdown
## Issue Audit: #{issue-number} - {issue-title}

### Metadata Review
- **Type**: [current labels]
- **Areas**: [current area labels]
- **Epic**: [epic relationship]
- **Phase**: [phase label]
- **Milestone**: [milestone assignment]
- **Age**: [days since creation]
```

### 2. Checklist Evaluation
For each of the 9 criteria:
- **PASS** ✅ - Meets criteria completely
- **FAIL** ❌ - Does not meet criteria, needs improvement
- **WARNING** ⚠️ - Partially meets criteria, improvement recommended

### 3. Detailed Assessment
```markdown
### Detailed Assessment

| Criterion | Status | Score | Notes |
|-----------|--------|-------|--------|
| 1. Acceptance Criteria | ✅/❌/⚠️ | [specific issues found] |
| 2. Type Label | ✅/❌/⚠️ | [missing/wrong labels] |
| 3. Area Labels | ✅/❌/⚠️ | [missing area coverage] |
| 4. Epic Alignment | ✅/❌/⚠️ | [epic relationship issues] |
| 5. Phase Label | ✅/❌/⚠️ | [sequencing problems] |
| 6. Milestone | ✅/❌/⚠️ | [timeline concerns] |
| 7. Description | ✅/❌/⚠️ | [clarity/context issues] |
| 8. Duplicates | ✅/❌/⚠️ | [potential duplicates found] |
| 9. Scope | ✅/❌/⚠️ | [scope concerns] |

**Overall Score: X/9**
```

## Improvement Recommendations

### For Each Failed Criterion

Generate specific, actionable recommendations:

#### Acceptance Criteria Improvements
```markdown
**Current Issue:** Vague acceptance criteria
**Recommended Fix:**
- Replace "should work well" with specific success conditions
- Add criteria for error handling: "When invalid input provided, display helpful error message"
- Include performance criteria: "Page loads within 2 seconds"

**Proposed Addition:**
- [ ] User can successfully log in with valid credentials
- [ ] Invalid credentials show clear error message
- [ ] Login form is accessible via keyboard navigation
```

#### Label Recommendations
```markdown
**Current Issue:** Missing type label
**Recommended Fix:** Add `enhancement` label based on feature description

**Current Issue:** Missing area labels
**Recommended Fix:** Add `area: auth` and `area: ui` labels based on authentication UI changes
```

#### Scope Reduction Strategies
```markdown
**Current Issue:** Scope too large (12 acceptance criteria, 5 areas)
**Recommended Fix:** Split into 3 focused issues:

1. **Core Authentication** (area: auth, phase-1)
   - Basic login/logout functionality
   - 4 focused acceptance criteria

2. **Authentication UI** (area: ui, phase-2, depends on #1)
   - Login form design and validation
   - 3 acceptance criteria

3. **Advanced Auth Features** (area: auth, phase-3)
   - Password reset, remember me, etc.
   - 5 acceptance criteria
```

## Fix Implementation

### Individual Approval Process
For each proposed fix:
1. **Present Fix**: Show current state vs proposed change
2. **Get Approval**: Wait for explicit approval before applying
3. **Apply Fix**: Make only the approved changes
4. **Verify**: Confirm changes were applied correctly

### Batch Operations
For similar fixes across multiple issues:
1. **Group Similar Changes**: Identify patterns across issues
2. **Present Batch Plan**: Show all proposed changes
3. **Get Batch Approval**: Single approval for consistent changes
4. **Execute Systematically**: Apply changes with verification

## Output Format

```markdown
## Issue Triage Report: #{issue-number}

### Quality Score: X/9

### Summary
[Brief assessment of overall issue quality]

### Checklist Results
| Criterion | Status | Priority | Fix Required |
|-----------|--------|----------|--------------|
| Acceptance Criteria | ❌ | High | Rewrite criteria for clarity |
| Type Label | ✅ | - | None |
| Area Labels | ⚠️ | Medium | Add `area: ui` label |
| Epic Alignment | ✅ | - | None |
| Phase Label | ❌ | High | Add `phase-2` label |
| Milestone | ⚠️ | Low | Consider moving to next milestone |
| Description | ❌ | High | Add context and motivation |
| Duplicates | ✅ | - | None |
| Scope | ❌ | Critical | Split into 2-3 focused issues |

### Recommended Actions

#### Critical (Must Fix)
1. **Scope Reduction**: [Specific plan for splitting issue]
2. **Acceptance Criteria**: [Rewritten criteria]

#### High Priority
1. **Description Enhancement**: [Specific content to add]
2. **Phase Assignment**: [Rationale for phase label]

#### Medium Priority
1. **Area Labels**: [Labels to add with justification]

#### Low Priority
1. **Milestone Adjustment**: [Recommendation with reasoning]

### Implementation Plan
[Step-by-step plan for applying fixes with approval checkpoints]
```

---

*Systematic issue triage ensures consistent quality standards and reduces ambiguity during implementation. Focus on making issues clear, complete, and actionable for developers.*