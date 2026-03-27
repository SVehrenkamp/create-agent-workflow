# /test - TDD-Aware Testing Command

Analyze code changes and implement comprehensive testing using {{test_framework}}. This command supports both test-driven development (TDD) and testing of existing code with intelligent test strategy selection.

## Test Analysis and Strategy

### 1. Change Detection
Identify what needs testing based on current changes:

```bash
git diff --name-only HEAD~1..HEAD
```

Analyze modified files to determine:
- New features requiring test coverage
- Modified functions needing updated tests
- Bug fixes requiring regression tests
- Refactored code needing validation

### 2. Test Strategy Selection

#### For New Features (TDD Approach)
- Write tests before implementation (red-green-refactor)
- Start with failing tests that describe desired behavior
- Implement minimal code to make tests pass
- Refactor while keeping tests green

#### For Bug Fixes
- Write regression tests that reproduce the bug
- Verify tests fail with current implementation
- Fix the bug and verify tests pass
- Add additional edge case tests

#### For Refactoring
- Ensure existing tests cover the code being refactored
- Add missing test coverage before refactoring
- Verify all tests pass after refactor
- Update test implementation if interfaces change

#### For Existing Code
- Audit current test coverage
- Identify gaps in test coverage
- Add missing unit and integration tests
- Focus on critical paths and edge cases

### 3. Test Type Determination

#### Unit Tests
Appropriate for:
- Pure functions and business logic
- Individual class or module behavior
- Error handling and edge cases
- Data validation and transformation

#### Integration Tests
Appropriate for:
- Component interactions
- API endpoint testing
- Database operations
- External service integration

#### End-to-End Tests
Appropriate for:
- User workflow validation
- Cross-system functionality
- Critical business processes
- UI interaction testing

## {{test_framework}} Implementation

### Test Execution Command
```bash
{{test_command}}
```

### Test File Organization
Follow project conventions for:
- Test file naming and location
- Test suite organization
- Shared test utilities and helpers
- Mock and fixture management

### Test Implementation Patterns

#### Test Structure
Use clear test organization (Arrange-Act-Assert or Given-When-Then):

```
describe('Component/Function Name', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange: Set up test data and mocks

    // Act: Execute the code under test

    // Assert: Verify expected outcomes
  });
});
```

#### Descriptive Test Names
- Explain the scenario being tested
- Include expected outcome
- Make tests readable by stakeholders
- Use consistent naming conventions

#### Test Data Management
- Use factories or builders for test data
- Create realistic but minimal test scenarios
- Avoid hardcoded values that obscure intent
- Clean up test data between tests

## Testing Strategy by Code Area

### Business Logic Testing
- Test all code paths and branches
- Include boundary conditions and edge cases
- Test error scenarios and exception handling
- Verify input validation and output formatting

### API/Interface Testing
- Test all public methods and functions
- Verify contract adherence and type safety
- Test error responses and status codes
- Validate input sanitization and output format

### Data Layer Testing
- Test CRUD operations and queries
- Verify data integrity and constraints
- Test transaction handling and rollbacks
- Check performance with realistic data volumes

### UI/Component Testing
- Test user interactions and event handling
- Verify rendering with different props/state
- Test accessibility and keyboard navigation
- Validate responsive design and layouts

## Mock and Test Double Strategy

### When to Mock
- External services and APIs
- File system and database operations
- Time-dependent functionality
- Network calls and I/O operations

### When to Use Real Dependencies
- Lightweight, fast operations
- In-memory data structures
- Pure functions without side effects
- Configuration and constants

### Mock Implementation
- Keep mocks simple and focused
- Mock behavior, not implementation
- Use dependency injection for testability
- Verify mock interactions when relevant

## Test Quality Standards

### Coverage Goals
- Aim for high coverage of critical business logic
- Focus on meaningful coverage, not just percentage
- Ensure error paths and edge cases are tested
- Monitor coverage trends over time

### Test Reliability
- Tests should pass/fail consistently
- Avoid flaky tests that fail intermittently
- Use deterministic test data and timing
- Clean up side effects between tests

### Test Maintainability
- Keep tests simple and focused
- Extract common setup into helpers
- Update tests when requirements change
- Remove obsolete tests promptly

## Red-Green-Refactor Cycle

### Red Phase: Write Failing Test
1. Understand the requirement clearly
2. Write a test that describes the desired behavior
3. Run test and verify it fails for the right reason
4. Ensure test failure message is clear and helpful

### Green Phase: Make Test Pass
1. Write minimal code to make test pass
2. Don't over-engineer or optimize prematurely
3. Focus on making test green, not perfect code
4. Run test and verify it passes

### Refactor Phase: Improve Code
1. Improve code quality while keeping tests green
2. Run tests frequently during refactor
3. Extract common patterns and eliminate duplication
4. Update tests if API changes during refactor

## Test Execution and Results

### Running Test Suite
Execute tests with appropriate options:
```bash
{{test_command}}
```

### Watch Mode (if supported)
For continuous testing during development:
```bash
{{test_command}} --watch
```

### Coverage Reports (if supported)
Generate coverage information:
```bash
{{test_command}} --coverage
```

### Test Result Analysis
- Monitor pass/fail status
- Check execution time for performance issues
- Review coverage reports for gaps
- Investigate flaky or intermittent failures

## Error Handling and Debugging

### Test Failures
- Read failure messages carefully
- Check test setup and data
- Verify test logic and expectations
- Debug using framework-specific tools

### Coverage Gaps
- Identify untested code paths
- Prioritize critical functionality
- Add tests for edge cases and error conditions
- Balance coverage goals with development velocity

### Performance Issues
- Identify slow-running tests
- Optimize test setup and teardown
- Use appropriate test doubles for speed
- Parallelize test execution where possible

## Output Format

```markdown
## Test Results: {{test_framework}}

### Execution Summary
- **Total Tests**: X
- **Passing**: Y
- **Failing**: Z
- **Execution Time**: X seconds
- **Coverage**: X%

### New Tests Added
- [Test description]: Testing [functionality]
- [Test description]: Testing [functionality]

### Test Categories
- **Unit Tests**: X passing, Y failing
- **Integration Tests**: X passing, Y failing
- **E2E Tests**: X passing, Y failing

### Coverage Analysis
- **Lines Covered**: X/Y (Z%)
- **Functions Covered**: X/Y (Z%)
- **Branches Covered**: X/Y (Z%)

### Issues Found
[List any failing tests or coverage gaps]

### Recommendations
- [Suggestion for improving test coverage]
- [Recommendation for test performance]
- [Advice for test organization]

### Next Steps
[Actions needed to complete testing work]
```

---

*Comprehensive testing provides confidence in code correctness and enables fearless refactoring. Focus on meaningful tests that verify behavior and catch regressions.*