# /pr - Quality-Gated PR Creation

Create a pull request with comprehensive quality checks, automated review, and proper labeling. This command ensures PRs meet all quality standards before submission.

## Pre-PR Quality Checks

### 1. Deploy Checks
Run the complete quality gate suite:

#### Linting Check
```bash
{{linter_command}}
```
- Must pass with no errors or warnings
- Fix any linting violations before proceeding

#### Formatting Check
```bash
{{formatter_command}}
```
- Must pass with consistent formatting
- Fix any formatting issues before proceeding

#### Test Suite
```bash
{{test_command}}
```
- All tests must pass
- No skipped tests without justification
- Verify test coverage is adequate

### 2. Self-Review Process
Spawn the reviewer subagent to conduct self-review:

- Load `.claude/agents/reviewer.md` instructions
- Run the 12-item code review checklist against current changes
- Identify any FAIL items that must be addressed
- Fix all blocking issues before proceeding

#### Review Checklist Items
1. Tests Pass ✅❌
2. Lint Clean ✅❌
3. Format Clean ✅❌
4. No Regressions ✅❌
5. Acceptance Criteria Met ✅❌
6. Documentation Updated ✅❌
7. ADR Created ✅❌
8. Accessibility Reviewed ✅❌
9. Design System Compliance ✅❌
10. Error Handling ✅❌
11. Security Review ✅❌
12. Performance ✅❌

### 3. Fix Identified Issues
Address any FAIL findings from self-review:
- Fix code quality issues
- Update documentation
- Add missing tests
- Address security concerns
- Re-run quality checks after fixes

## PR Metadata and Labeling

### 1. Area Label Detection
Analyze changed file paths to determine appropriate area labels:

```bash
git diff --name-only HEAD~1..HEAD
```

Apply area labels based on file paths:
- `{{source_dir}}/auth/` → `area: auth`
- `{{source_dir}}/ui/` → `area: ui`
- `{{source_dir}}/api/` → `area: api`
- `tests/` → `area: testing`
- `docs/` → `area: docs`

### 2. Type Label Detection
Determine PR type from branch name and changes:
- `feat/*` branches → `type: enhancement`
- `fix/*` branches → `type: bug`
- `refactor/*` branches → `type: refactor`
- `docs/*` branches → `type: docs`
- `test/*` branches → `type: testing`

### 3. UI Change Detection
Check if changes affect UI paths defined in `{{ui_paths}}`:

```bash
git diff --name-only HEAD~1..HEAD | grep -E "{{ui_paths}}"
```

If UI changes detected:
- Add `area: ui` label
- Add reminder about screenshots in PR description
- Flag for accessibility review

## PR Body Assembly

### 1. Base Template
Use the template from `.github/PULL_REQUEST_TEMPLATE.md` as foundation.

### 2. Custom Sections

#### Summary
- Clear description of what the PR accomplishes
- Why the change was needed
- Reference to the original issue

#### Changes
- Bulleted list of specific changes made
- Highlight any breaking changes or API modifications
- Note any configuration or setup changes

#### Test Plan
- How changes were tested
- Manual testing steps if applicable
- Edge cases and error conditions tested
- Test command to run: `{{test_command}}`

#### Screenshots (If UI Changes)
- Reminder to add before/after screenshots
- Instructions for capturing relevant UI states
- Note accessibility considerations

#### Quality Checklist
- Pre-populate with current status from self-review
- Include links to CI results
- Document any exceptions or special considerations

### 3. Issue Linking
- Extract issue number from branch name or commit messages
- Add `Closes #[issue-number]` to PR body
- Verify issue exists and is open

## PR Creation

### 1. GitHub CLI Creation
```bash
gh pr create \
  --title "{type}({scope}): {description}" \
  --body "$(cat /tmp/pr_body.md)" \
  --label "type: {detected-type}" \
  --label "area: {detected-area}" \
  --assignee "@me"
```

### 2. Post-Creation Tasks
- Verify PR was created successfully
- Check that CI/CD pipeline starts running
- Confirm all labels were applied correctly
- Add to project board if configured

## Success Verification

### 1. CI Pipeline Status
- Monitor CI/CD pipeline execution
- Verify all checks pass (tests, lint, format)
- Address any CI failures immediately

### 2. PR Quality Check
- Confirm PR description is complete and accurate
- Verify proper linking to issue
- Check that screenshots are added for UI changes
- Ensure all quality checklist items are addressed

### 3. Review Readiness
- PR is ready for team review
- All automated checks pass
- No obvious issues remain
- Documentation is up to date

## Error Handling

### Quality Check Failures
- Fix linting issues automatically where possible
- Address formatting problems
- Investigate and fix test failures
- Re-run checks after fixes

### PR Creation Failures
- Check GitHub authentication and permissions
- Verify repository access and branch existence
- Retry with corrected parameters
- Escalate if GitHub service issues

### CI Pipeline Failures
- Review CI logs for failure causes
- Fix configuration or dependency issues
- Push additional commits to address failures
- Monitor until all checks pass

## Output Format

```markdown
## PR Created Successfully 🎉

**PR URL**: [Link to created PR]

### Quality Status
- ✅ Lint: Clean
- ✅ Format: Clean
- ✅ Tests: All passing (X/X)
- ✅ Self-Review: Passed 12/12 checks

### Labels Applied
- type: {type}
- area: {area}
- [additional labels]

### Next Steps
1. Monitor CI pipeline completion
2. Address any CI failures
3. Request review from team members
4. Respond to review feedback when received

### Issue Resolution
- Closes #{issue-number}: [issue title]
```

---

*Quality-gated PR creation ensures consistent standards and reduces review burden by catching issues early.*