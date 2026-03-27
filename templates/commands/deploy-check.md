# /deploy-check - Pre-Merge Quality Gate

Run comprehensive quality checks to ensure code is ready for deployment. This command serves as the final quality gate before merging changes to the main branch.

## Quality Check Suite

### 1. Linting Check
Verify code follows project linting standards:

```bash
{{linter_command}}
```

**Pass Criteria**:
- No linting errors or warnings
- All code follows established style guidelines
- No rule violations introduced

**Common Failures**:
- Unused variables or imports
- Inconsistent naming conventions
- Missing error handling patterns
- Code complexity violations

### 2. Formatting Check
Ensure consistent code formatting:

```bash
{{formatter_command}}
```

**Pass Criteria**:
- All code formatted consistently
- No formatting violations
- Proper indentation and spacing

**Common Failures**:
- Mixed indentation (spaces vs tabs)
- Inconsistent line endings
- Import organization violations
- Whitespace inconsistencies

### 3. Test Suite Execution
Run complete test suite to verify functionality:

```bash
{{test_command}}
```

**Pass Criteria**:
- All tests pass without failures
- No skipped tests without justification
- Test coverage meets minimum requirements
- No test timeouts or hangs

**Common Failures**:
- Unit test failures from logic errors
- Integration test failures from dependency issues
- Flaky tests failing intermittently
- Test setup or teardown problems

### 4. Project-Specific Checks

Run the project-specific checks appropriate for this project's archetype ({{archetype}}):

**For web apps**: bundle size analysis, accessibility audit, performance audit (Lighthouse).
**For mobile apps**: build verification (xcodebuild/gradlew), static analysis.
**For CLI/libraries**: package validation (dry-run publish), CLI help text verification.

```bash
# TODO: configure project-specific checks for {{archetype}}
```

### 5. Security Checks

#### Dependency Audit
```bash
# TODO: configure dependency security scanning
# npm audit
# cargo audit
# go mod tidy && go list -json -m all | nancy sleuth
```

#### Secret Detection
```bash
# TODO: configure secret scanning
# gitleaks detect --source .
# truffleHog --regex --entropy=False .
```

#### License Compatibility
```bash
# TODO: configure license checking
# license-checker --onlyAllow 'MIT;ISC;BSD;Apache-2.0'
```

## Check Execution and Reporting

### Parallel Execution
Run independent checks in parallel for efficiency:
- Linting and formatting can run simultaneously
- Test execution may need to run separately if resource-intensive
- Security checks can run in background

### Result Collection
Collect results from all checks:
- Exit codes for pass/fail status
- Output logs for detailed error information
- Metrics for performance and coverage
- Timestamps for execution duration

### Quality Gate Decision
Determine overall pass/fail status:
- All critical checks must pass
- Some advisory checks may warn without blocking
- Document any exceptions or overrides
- Provide clear guidance on remediation

## Output Format

```markdown
## Deploy Check Results

### Overall Status: ✅ PASS / ❌ FAIL

### Check Results

| Check | Status | Duration | Details |
|-------|--------|----------|---------|
| Lint ({{linter}}) | ✅/❌ | X.Xs | [Brief status] |
| Format ({{formatter}}) | ✅/❌ | X.Xs | [Brief status] |
| Tests ({{test_framework}}) | ✅/❌ | X.Xs | X/Y passing |
| Security Scan | ✅/❌ | X.Xs | [Brief status] |
| Bundle Size | ✅/❌ | X.Xs | [Brief status] |
| [Additional Check] | ✅/❌ | X.Xs | [Brief status] |

### Detailed Results

#### ❌ Failed Checks
[For any failing checks, provide detailed output and remediation steps]

#### ⚠️ Warnings
[Any non-blocking issues that should be addressed]

#### ✅ Passed Checks
[Summary of successful checks]

### Metrics Summary
- **Total Execution Time**: X minutes Y seconds
- **Test Coverage**: X%
- **Bundle Size**: X KB (target: Y KB)
- **Linting Issues**: X errors, Y warnings
- **Security Issues**: X critical, Y moderate

### Next Steps
[Required actions to address any failures or recommendations for improvement]
```

## Error Remediation Guidance

### Linting Failures
1. Review specific rule violations
2. Fix issues manually or use auto-fix where available
3. Update code to match project style guidelines
4. Consider rule exceptions only with justification

### Formatting Failures
1. Run automatic formatter to fix most issues
2. Address any remaining manual formatting needs
3. Check for configuration conflicts
4. Ensure consistent tool versions across team

### Test Failures
1. Identify root cause of test failures
2. Fix logic errors or update tests if requirements changed
3. Address flaky tests by improving test stability
4. Check for environment or dependency issues

### Security Issues
1. Update vulnerable dependencies to secure versions
2. Remove or replace packages with security issues
3. Address any leaked secrets or credentials
4. Review code for security best practices

### Performance Issues
1. Optimize bundle size by removing unused dependencies
2. Implement code splitting or lazy loading
3. Review and optimize expensive operations
4. Consider caching strategies for repeated operations

## Integration with CI/CD

### Automated Execution
- Run deploy checks automatically on every PR
- Block merge if any critical checks fail
- Cache dependencies and build artifacts for speed
- Parallelize checks where possible

### Status Reporting
- Report check status to GitHub PR
- Provide links to detailed logs and reports
- Update check status as issues are resolved
- Notify relevant team members of failures

### Quality Metrics Tracking
- Track quality metrics over time
- Identify trends in test coverage or performance
- Alert on quality degradation
- Celebrate improvements and milestones

---

*Deploy checks ensure consistent quality and catch issues before they reach production. Run these checks early and often to maintain high code quality standards.*