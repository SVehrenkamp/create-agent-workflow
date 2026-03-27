# {{project_name}} Project-Specific Conventions

This document defines {{project_name}}-specific conventions that supplement the universal AGENTS.md framework.

## {{language}} Conventions

### Naming Patterns
<!-- TODO: Define naming conventions for files, classes, functions, variables -->
<!-- Example: PascalCase for classes, camelCase for functions, kebab-case for files -->

### Code Organization Patterns
<!-- TODO: Define module structure, layer boundaries, dependency injection patterns -->
<!-- Example: Feature-based modules, MVVM architecture, dependency container setup -->

### State Management
<!-- TODO: Define state management approach and patterns -->
<!-- Example: SwiftUI @State/@StateObject/@ObservedObject patterns, Redux patterns, etc. -->

### Error Handling
<!-- TODO: Define error handling strategies -->
<!-- Example: Result types, error enums, user-facing error messages -->

### Anti-Patterns to Avoid
<!-- TODO: List common mistakes and patterns to avoid -->
<!-- Example: Massive view controllers, tight coupling, blocking main thread -->

## Design System

### Color Tokens
<!-- TODO: Define color palette and semantic color usage -->
<!-- Example: Primary, secondary, accent colors, dark/light mode variants -->

### Typography Scale
<!-- TODO: Define text styles, font sizes, line heights -->
<!-- Example: Headline, body, caption styles with accessibility considerations -->

### Spacing System
<!-- TODO: Define spacing scale for margins, padding, layout -->
<!-- Example: 4pt base unit, 8/12/16/24/32/48pt increments -->

### Component Patterns
<!-- TODO: Define reusable component library and usage patterns -->
<!-- Example: Button variants, card layouts, list items, navigation patterns -->

## Architecture Patterns

### Layer Boundaries
<!-- TODO: Define separation between UI, business logic, and data layers -->
<!-- Example: SwiftUI views -> ViewModels -> Services -> Repositories -->

### Navigation Patterns
<!-- TODO: Define navigation structure and flow patterns -->
<!-- Example: TabView structure, NavigationStack patterns, modal presentations -->

### Data Flow Architecture
<!-- TODO: Define how data moves through the app -->
<!-- Example: Unidirectional data flow, reactive patterns, caching strategies -->

### Dependency Management
<!-- TODO: Define how dependencies are injected and managed -->
<!-- Example: Protocol-based injection, container patterns, environment values -->

## {{backend}} Integration

### API Patterns
<!-- TODO: Define API client patterns, request/response handling -->
<!-- Example: Async/await patterns, error mapping, retry strategies -->

### Authentication Flow
<!-- TODO: Define auth patterns, token management, session handling -->
<!-- Example: OAuth flow, keychain storage, automatic token refresh -->

### Data Synchronization
<!-- TODO: Define offline/online sync patterns -->
<!-- Example: Core Data sync, conflict resolution, background refresh -->

### Local Data Management
<!-- TODO: Define local-only data patterns if no backend, or offline caching strategy -->
<!-- Example: Core Data, UserDefaults, file system usage -->

## {{test_framework}} Testing

### Unit Test Patterns
<!-- TODO: Define unit testing conventions and mocking strategies -->
<!-- Example: Given-When-Then structure, mock protocols, test doubles -->

### UI Test Patterns
<!-- TODO: Define UI testing approach and page object patterns -->
<!-- Example: XCUITest patterns, accessibility identifier usage -->

### Test Data Management
<!-- TODO: Define test fixture and mock data strategies -->
<!-- Example: Factory patterns, snapshot testing, API mocking -->

### Testing Architecture
<!-- TODO: Define test organization and shared testing utilities -->
<!-- Example: Test target organization, shared mocks, test helpers -->

## Platform-Specific Considerations

### iOS Specific
<!-- TODO: Define iOS-specific patterns and conventions -->
<!-- Example: Scene lifecycle, background tasks, universal links -->

### macOS Specific (if applicable)
<!-- TODO: Define macOS-specific patterns -->
<!-- Example: Menu bar integration, window management, keyboard shortcuts -->

### Cross-Platform Patterns (if applicable)
<!-- TODO: Define shared code patterns between platforms -->
<!-- Example: Shared business logic, platform abstractions -->

## Performance Guidelines

### Memory Management
<!-- TODO: Define memory management best practices -->
<!-- Example: ARC patterns, weak references, memory leak prevention -->

### Battery Optimization
<!-- TODO: Define power-efficient coding patterns -->
<!-- Example: Background processing limits, efficient animations -->

### Launch Time Optimization
<!-- TODO: Define app launch optimization strategies -->
<!-- Example: Lazy loading, startup sequence optimization -->

## Accessibility Standards

### VoiceOver Support
<!-- TODO: Define accessibility label and hint conventions -->
<!-- Example: Descriptive labels, custom actions, trait usage -->

### Dynamic Type
<!-- TODO: Define text scaling support patterns -->
<!-- Example: Scalable font usage, layout adaptation -->

### Color and Contrast
<!-- TODO: Define color accessibility requirements -->
<!-- Example: Contrast ratios, color-blind friendly palettes -->

## App Store Guidelines

### Review Guidelines Compliance
<!-- TODO: Define patterns that ensure App Store approval -->
<!-- Example: Content guidelines, functionality requirements -->

### Metadata Conventions
<!-- TODO: Define app store metadata patterns -->
<!-- Example: Screenshot specs, description templates, keyword strategy -->

### Privacy and Permissions
<!-- TODO: Define privacy-conscious patterns -->
<!-- Example: Permission request timing, privacy manifest usage -->

## Documentation Update Mapping

| Code Area | Documentation File | Notes |
|-----------|-------------------|--------|
| {{source_dir}}/Views/ | docs/ui-components.md | UI component documentation |
| {{source_dir}}/ViewModels/ | docs/architecture.md | Business logic patterns |
| {{source_dir}}/Services/ | docs/api-integration.md | Service layer documentation |
| {{source_dir}}/Models/ | docs/data-models.md | Data structure documentation |
| Tests/ | docs/testing-guide.md | Testing patterns and examples |
| <!-- TODO: Add mappings for your specific project structure --> | | |

---

*Update this file as project conventions evolve. Ensure all team members and AI agents follow these patterns for consistent development.*