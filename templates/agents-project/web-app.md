# {{project_name}} Project-Specific Conventions

This document defines {{project_name}}-specific conventions that supplement the universal AGENTS.md framework.

## {{framework}} Conventions

### Component Patterns
<!-- TODO: Define component structure, prop patterns, composition patterns -->
<!-- Example: Functional components, custom hooks, compound components -->

### State Management
<!-- TODO: Define state management approach and patterns -->
<!-- Example: React Context, Redux Toolkit, Zustand patterns, server state vs client state -->

### Routing Conventions
<!-- TODO: Define routing structure and navigation patterns -->
<!-- Example: File-based routing, route guards, nested layouts, navigation patterns -->

### Styling Approach
<!-- TODO: Define styling methodology and organization -->
<!-- Example: CSS Modules, Styled Components, Tailwind conventions, design tokens -->

### Performance Patterns
<!-- TODO: Define performance optimization patterns -->
<!-- Example: Code splitting, lazy loading, memoization, bundle optimization -->

## Design System

### Design Tokens
<!-- TODO: Define design token structure and usage -->
<!-- Example: Color scales, typography tokens, spacing scale, breakpoint tokens -->

### Component Library
<!-- TODO: Define reusable component patterns and API design -->
<!-- Example: Button variants, form components, layout primitives, data display -->

### Responsive Breakpoints
<!-- TODO: Define responsive design breakpoints and patterns -->
<!-- Example: Mobile-first approach, breakpoint naming, container queries -->

### Animation Standards
<!-- TODO: Define animation and transition patterns -->
<!-- Example: Easing curves, duration standards, reduced motion support -->

## Architecture Patterns

### Client/Server Boundaries
<!-- TODO: Define where client and server responsibilities split -->
<!-- Example: SSR patterns, API boundaries, hydration strategies -->

### Data Fetching Patterns
<!-- TODO: Define data fetching and caching strategies -->
<!-- Example: SWR patterns, React Query, optimistic updates, error boundaries -->

### API Layer Organization
<!-- TODO: Define API client structure and error handling -->
<!-- Example: REST client patterns, GraphQL conventions, type generation -->

### State Architecture
<!-- TODO: Define state organization and flow patterns -->
<!-- Example: Feature-based state, normalized state, derived state patterns -->

## {{backend}} Integration

### API Conventions
<!-- TODO: Define API interaction patterns and type safety -->
<!-- Example: OpenAPI integration, type generation, request/response patterns -->

### Authentication Patterns
<!-- TODO: Define auth flow, token management, session handling -->
<!-- Example: JWT handling, refresh token patterns, protected route patterns -->

### Data Synchronization
<!-- TODO: Define client-server data sync patterns -->
<!-- Example: Cache invalidation, background sync, offline support -->

### Static/Local Data
<!-- TODO: Define local storage and caching patterns -->
<!-- Example: Static generation, local storage, content management -->

## {{test_framework}} Testing

### Component Testing
<!-- TODO: Define component testing patterns and utilities -->
<!-- Example: Testing Library patterns, component setup, mock strategies -->

### Integration Testing
<!-- TODO: Define integration test patterns -->
<!-- Example: API mocking, full-page tests, user journey tests -->

### E2E Testing Approach
<!-- TODO: Define end-to-end testing strategy -->
<!-- Example: Playwright patterns, test data management, CI integration -->

### Test Organization
<!-- TODO: Define test file organization and shared utilities -->
<!-- Example: Co-location vs separate folders, test utilities, fixtures -->

## Build and Development

### Development Workflow
<!-- TODO: Define local development setup and workflows -->
<!-- Example: Hot reloading, environment configuration, proxy setup -->

### Build Optimization
<!-- TODO: Define build configuration and optimization strategies -->
<!-- Example: Webpack/Vite config, bundle analysis, asset optimization -->

### Environment Management
<!-- TODO: Define environment variable patterns and configuration -->
<!-- Example: .env patterns, runtime vs build-time config, type safety -->

## SEO and Performance

### SEO Patterns
<!-- TODO: Define SEO optimization patterns -->
<!-- Example: Meta tag management, sitemap generation, structured data -->

### Core Web Vitals
<!-- TODO: Define performance measurement and optimization -->
<!-- Example: LCP optimization, CLS prevention, FID improvement -->

### Accessibility Standards
<!-- TODO: Define accessibility patterns and testing -->
<!-- Example: ARIA patterns, keyboard navigation, screen reader support -->

## Security Considerations

### Client-Side Security
<!-- TODO: Define client-side security patterns -->
<!-- Example: XSS prevention, CSP configuration, input validation -->

### Authentication Security
<!-- TODO: Define auth security patterns -->
<!-- Example: Token storage, CSRF protection, secure redirects -->

### Data Privacy
<!-- TODO: Define privacy-conscious patterns -->
<!-- Example: GDPR compliance, cookie management, data collection patterns -->

## Deployment and DevOps

### Build Pipeline
<!-- TODO: Define CI/CD patterns and deployment strategies -->
<!-- Example: GitHub Actions workflows, environment promotion, rollback strategies -->

### Monitoring and Observability
<!-- TODO: Define monitoring and error tracking patterns -->
<!-- Example: Error boundaries, analytics integration, performance monitoring -->

### Feature Flags
<!-- TODO: Define feature flag patterns and management -->
<!-- Example: Feature toggle implementation, gradual rollouts, A/B testing -->

## Documentation Update Mapping

| Code Area | Documentation File | Notes |
|-----------|-------------------|--------|
| {{source_dir}}/components/ | docs/component-library.md | Component documentation and examples |
| {{source_dir}}/pages/ | docs/page-architecture.md | Page structure and routing |
| {{source_dir}}/api/ | docs/api-integration.md | API patterns and endpoints |
| {{source_dir}}/hooks/ | docs/hooks-patterns.md | Custom hook documentation |
| {{source_dir}}/styles/ | docs/design-system.md | Styling patterns and design tokens |
| {{source_dir}}/utils/ | docs/utility-functions.md | Shared utility documentation |
| tests/ | docs/testing-guide.md | Testing patterns and examples |
| <!-- TODO: Add mappings for your specific project structure --> | | |

---

*Update this file as project conventions evolve. Ensure all team members and AI agents follow these patterns for consistent development.*