# /address-feedback - PR Feedback Resolution

Systematically address code review feedback by fetching review comments, organizing them by file, implementing fixes, and validating the changes through automated quality checks.

## Feedback Collection

### 1. Fetch Current PR Review Comments
```bash
gh pr view --json reviews,reviewRequests,comments
```

Extract review information:
- Review comments with file locations and line numbers
- General PR comments and suggestions
- Requested changes vs approved status
- Reviewer identities and timestamps

### 2. Fetch Individual Review Comments
```bash
gh api repos/:owner/:repo/pulls/:pull_number/comments
```

Get detailed comment data:
- File path and line number for each comment
- Comment body and context
- Conversation thread status (resolved/unresolved)
- Suggested changes or code snippets

### 3. Identify Actionable Feedback
Parse comments to identify:
- **Must Fix**: Blocking issues that prevent merge
- **Should Fix**: Important improvements that should be addressed
- **Consider**: Suggestions that may be optional
- **Questions**: Comments requiring clarification or response

## Feedback Organization

### 1. Group Comments by File
Organize feedback by affected files:
```markdown
### {{file_path}}
- Line X: [Comment summary]
- Line Y: [Comment summary]

### {{another_file_path}}
- Line Z: [Comment summary]
```

### 2. Categorize by Type
Group feedback by resolution strategy:
- **Code Changes**: Requires implementation modifications
- **Documentation**: Needs doc updates or clarifications
- **Testing**: Requires additional or modified tests
- **Architecture**: May need design discussion or ADR
- **Style/Formatting**: Code style improvements

### 3. Prioritize by Impact
Order feedback by resolution priority:
1. **Blocking**: Must be fixed before merge
2. **High**: Important for code quality
3. **Medium**: Beneficial improvements
4. **Low**: Nice-to-have enhancements

## Systematic Resolution Process

### 1. Address Blocking Issues First
For each blocking issue:
- Understand the reviewer's concern
- Implement the requested change
- Add tests if functionality is modified
- Document significant changes

### 2. Implement Code Changes
For each code modification:
- Navigate to the specific file and line
- Understand the existing code context
- Make the requested change
- Ensure change doesn't break existing functionality
- Follow project coding conventions

### 3. Update Tests
When code changes affect behavior:
- Update existing tests to match new behavior
- Add new tests for new functionality
- Remove obsolete tests
- Verify all tests still pass

### 4. Update Documentation
For documentation-related feedback:
- Update inline code comments
- Modify API documentation
- Update user-facing documentation
- Create or update ADRs if architectural

## Quality Validation

### 1. Run Deploy Checks
Execute quality checks after each set of changes:

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

### 2. Incremental Validation
- Run checks after each file modification
- Fix issues before moving to next feedback item
- Ensure changes don't introduce new problems
- Maintain green build status throughout process

### 3. Regression Prevention
- Verify existing functionality isn't broken
- Run relevant test suites for modified areas
- Check for unintended side effects
- Validate performance hasn't degraded

## Commit Strategy

### 1. Logical Grouping
Group related fixes into logical commits:
- One commit per reviewer or feedback theme
- Separate commits for different types of changes
- Keep commits atomic and focused

### 2. Descriptive Commit Messages
Use clear commit messages that reference feedback:
```
fix: address reviewer feedback on error handling

- Add null check in user validation (addresses @reviewer comment)
- Improve error message clarity
- Add test case for edge condition

Addresses review feedback from PR #123
```

### 3. Commit Frequency
- Commit after each logical group of fixes
- Don't wait until all feedback is addressed
- Allow for incremental review of fixes
- Maintain clean commit history

## Communication and Follow-up

### 1. Response to Comments
For each addressed comment:
- Reply to the review comment thread
- Explain the fix that was implemented
- Reference the commit that addresses it
- Mark as resolved if appropriate

### 2. Summary Comment
Post comprehensive summary to PR:
```markdown
## Feedback Resolution Summary

### Addressed Items ✅
- [Reviewer]: Fixed error handling logic (commit abc123)
- [Reviewer]: Updated documentation (commit def456)
- [Reviewer]: Added missing test cases (commit ghi789)

### Questions/Clarifications 💬
- [Reviewer]: Regarding architecture choice - see my response below
- [Reviewer]: Performance concern - added benchmark results

### Changes Made
- Modified X files
- Added Y test cases
- Updated Z documentation files

### Quality Checks
- ✅ Lint: Clean
- ✅ Format: Clean
- ✅ Tests: All passing (X/Y)
```

### 3. Request Re-review
- Tag reviewers for re-review after fixes
- Highlight significant changes or architectural decisions
- Provide context for complex changes
- Express appreciation for thorough review

## Output Format

```markdown
## Feedback Resolution Progress

### Feedback Summary
- **Total Comments**: X
- **Blocking Issues**: Y
- **Addressed**: Z
- **Remaining**: W

### Resolution Status by Reviewer

#### @reviewer1
- [✅] File.js:45 - Fixed error handling logic
- [✅] README.md - Updated documentation
- [⏳] test.js:12 - In progress

#### @reviewer2
- [✅] Component.tsx:89 - Added prop validation
- [❓] Architecture question - responded with clarification

### Files Modified
- `{{file_path}}` - Fixed validation logic, added tests
- `{{another_file}}` - Updated error messages
- `docs/api.md` - Clarified usage examples

### Quality Status
- ✅ All quality checks passing
- ✅ No new issues introduced
- ✅ Test coverage maintained

### Next Steps
- [ ] Wait for re-review from @reviewer1
- [ ] Address any additional feedback
- [ ] Ready for merge after approval
```

## Error Handling

### Failed Quality Checks
- Stop addressing feedback if quality checks fail
- Fix quality issues before continuing
- Re-run checks to verify fixes
- Document any persistent issues

### Unclear Feedback
- Ask for clarification in comment thread
- Provide context about current implementation
- Suggest alternative approaches if needed
- Escalate to team discussion if necessary

### Conflicting Feedback
- Identify conflicts between different reviewers
- Facilitate discussion between reviewers
- Document trade-offs and decisions made
- Get consensus before proceeding

### Technical Blockers
- Document technical constraints preventing fixes
- Suggest alternative solutions
- Escalate architectural decisions to appropriate stakeholders
- Create follow-up issues for future improvements

---

*Systematic feedback resolution ensures thorough review responses while maintaining code quality throughout the process.*