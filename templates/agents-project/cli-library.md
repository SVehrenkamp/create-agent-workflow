# {{project_name}} Project-Specific Conventions

This document defines {{project_name}}-specific conventions that supplement the universal AGENTS.md framework.

## {{language}} Conventions

### Module Structure
<!-- TODO: Define module organization and public API patterns -->
<!-- Example: Lib/bin structure, public vs internal modules, re-export patterns -->

### Public API Design
<!-- TODO: Define public interface patterns and stability guarantees -->
<!-- Example: Semantic versioning, deprecation patterns, backward compatibility -->

### Error Handling Patterns
<!-- TODO: Define error types, error propagation, and user-facing messages -->
<!-- Example: Result types, error enums, exit codes, error context -->

### Configuration Management
<!-- TODO: Define config file patterns, environment variables, option parsing -->
<!-- Example: TOML/YAML config, CLI argument parsing, config validation -->

### Logging and Output
<!-- TODO: Define logging levels, output formatting, and verbosity patterns -->
<!-- Example: Structured logging, progress indicators, colored output -->

## CLI Design (if applicable)

### Command Structure
<!-- TODO: Define command hierarchy and subcommand patterns -->
<!-- Example: Git-style subcommands, option grouping, help text format -->

### Argument Parsing
<!-- TODO: Define argument parsing patterns and validation -->
<!-- Example: Clap patterns, argument types, mutual exclusion -->

### Output Formatting
<!-- TODO: Define output formats and user experience patterns -->
<!-- Example: JSON/YAML output, table formatting, progress bars -->

### Exit Codes
<!-- TODO: Define exit code conventions -->
<!-- Example: Success (0), general error (1), usage error (2), specific error codes -->

### Configuration Files
<!-- TODO: Define config file locations and formats -->
<!-- Example: XDG Base Directory spec, TOML format, config merging -->

## Library API Design (if applicable)

### Public Interface
<!-- TODO: Define library interface patterns and design principles -->
<!-- Example: Builder patterns, fluent APIs, trait/interface design -->

### Versioning Strategy
<!-- TODO: Define semantic versioning and breaking change policies -->
<!-- Example: Breaking change policy, deprecation timeline, migration guides -->

### Documentation Standards
<!-- TODO: Define doc comment patterns and example requirements -->
<!-- Example: Rustdoc patterns, docstring format, example coverage -->

### Backward Compatibility
<!-- TODO: Define compatibility guarantees and migration strategies -->
<!-- Example: Feature flags, deprecation warnings, migration tooling -->

## Error Handling and Diagnostics

### Error Types
<!-- TODO: Define error hierarchy and error information patterns -->
<!-- Example: Domain-specific errors, error context, error codes -->

### User-Facing Messages
<!-- TODO: Define error message format and tone -->
<!-- Example: Actionable messages, suggestion patterns, help text -->

### Debug Information
<!-- TODO: Define debug output and diagnostic patterns -->
<!-- Example: Debug flags, verbose modes, trace output -->

### Panic/Exception Policy
<!-- TODO: Define when to panic vs return errors -->
<!-- Example: Panic for programmer errors, graceful degradation -->

## {{test_framework}} Testing

### Unit Test Patterns
<!-- TODO: Define unit test organization and patterns -->
<!-- Example: Test module organization, property-based testing, test fixtures -->

### Integration Test Strategy
<!-- TODO: Define integration test patterns -->
<!-- Example: CLI testing patterns, API testing, end-to-end scenarios -->

### Mock and Fixture Patterns
<!-- TODO: Define testing double patterns and test data management -->
<!-- Example: Dependency injection for testing, mock objects, test data -->

### Performance Testing
<!-- TODO: Define performance testing patterns -->
<!-- Example: Benchmark tests, memory usage tests, scaling tests -->

## Package Management and Distribution

### Package Metadata
<!-- TODO: Define package.json/Cargo.toml/setup.py patterns -->
<!-- Example: Metadata completeness, keyword selection, categorization -->

### Dependency Management
<!-- TODO: Define dependency selection and version pinning strategies -->
<!-- Example: Minimal dependencies, security auditing, license compatibility -->

### Release Process
<!-- TODO: Define release automation and publishing patterns -->
<!-- Example: Automated releases, changelog generation, artifact signing -->

### Installation Methods
<!-- TODO: Define supported installation methods -->
<!-- Example: Package manager support, binary releases, installation scripts -->

## Platform Compatibility

### Cross-Platform Support
<!-- TODO: Define platform-specific patterns and abstractions -->
<!-- Example: Platform-specific modules, conditional compilation, path handling -->

### Shell Compatibility
<!-- TODO: Define shell integration patterns -->
<!-- Example: Completion scripts, shell aliases, environment integration -->

### System Integration
<!-- TODO: Define system integration patterns -->
<!-- Example: Signal handling, process management, file system operations -->

## Performance and Resource Management

### Memory Management
<!-- TODO: Define memory usage patterns and optimization strategies -->
<!-- Example: Streaming processing, memory-mapped files, garbage collection -->

### I/O Patterns
<!-- TODO: Define efficient I/O patterns -->
<!-- Example: Async I/O, buffering strategies, progress reporting -->

### Concurrency Patterns
<!-- TODO: Define concurrent processing patterns -->
<!-- Example: Thread pools, async patterns, parallel processing -->

## Security Considerations

### Input Validation
<!-- TODO: Define input sanitization and validation patterns -->
<!-- Example: Path traversal prevention, command injection protection -->

### Privilege Management
<!-- TODO: Define privilege escalation and permission patterns -->
<!-- Example: Least privilege principle, permission checking -->

### Credential Handling
<!-- TODO: Define secure credential storage and usage -->
<!-- Example: Keyring integration, environment variable patterns -->

## Documentation Update Mapping

| Code Area | Documentation File | Notes |
|-----------|-------------------|--------|
| {{source_dir}}/lib/ | docs/api-reference.md | Library API documentation |
| {{source_dir}}/bin/ | docs/cli-reference.md | CLI command documentation |
| {{source_dir}}/config/ | docs/configuration.md | Configuration options and files |
| examples/ | docs/examples.md | Usage examples and tutorials |
| tests/ | docs/testing-guide.md | Testing patterns and examples |
| benchmarks/ | docs/performance.md | Performance characteristics |
| <!-- TODO: Add mappings for your specific project structure --> | | |

## Usage Examples

### Library Usage (if applicable)
```{{language}}
// TODO: Add common usage examples
```

### CLI Usage (if applicable)
```bash
# TODO: Add common CLI usage examples
{{project_name}} --help
{{project_name}} command --option value
```

---

*Update this file as project conventions evolve. Ensure all team members and AI agents follow these patterns for consistent development.*