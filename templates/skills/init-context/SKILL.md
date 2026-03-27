# Product Context Interview Skill

Conduct an adaptive product context interview based on project archetype and write structured output to docs/product-context.md.

## Overview

This skill conducts an AI-powered interview to gather comprehensive product context for {{project_name}}. The interview adapts based on the project's archetype ({{archetype}}) and technology stack to gather relevant strategic information.

## Interview Process

### 1. Project Context Analysis

First, read the current AGENTS.project.md to understand:
- Project archetype: {{archetype}}
- Technology stack: {{language}}, {{framework}}
- Target platform and deployment model

### 2. Adaptive Interview Structure

#### Core Interview (All Archetypes)

**Product Vision & Purpose**
- What problem does {{project_name}} solve?
- What's the core value proposition?
- What makes this solution unique or necessary?
- How do you define success for this product?

**Target User Definition**
- Who is the primary user of {{project_name}}?
- What's their current workflow or pain point?
- What's their technical sophistication level?
- What platforms/environments do they use?

**Current State Assessment**
- What's the current state of development?
- What's already been built or decided?
- What are the biggest unknowns or risks?
- What's the timeline for initial launch?

**Launch Criteria Definition**
- What must be true for launch readiness?
- What are the minimum viable features?
- What quality standards must be met?
- What does "good enough" look like?

**Explicit Non-Goals**
- What will this product NOT do?
- What features are explicitly out of scope?
- What user segments will you NOT serve?
- What technical approaches will you avoid?

**Constraints & Context**
- What are the resource constraints (team size, timeline, budget)?
- What technical constraints exist (platform, language, infrastructure)?
- What business constraints affect decisions?
- What external dependencies or partnerships exist?

#### Archetype-Specific Questions

Based on the project archetype (read from AGENTS.project.md), ask the relevant additional questions:

**If mobile-app:**

- App Store Strategy: Which stores? Review process? Optimization approach?
- Platform & Device Scope: iOS/Android/cross-platform? Minimum OS? Tablet support? Device features (camera, GPS, biometrics)?
- Mobile-Specific: Offline support? Push notifications? Data sync? Battery constraints?

**If web-app:**

- Application Model: SaaS, internal tool, or public utility? Multi-tenant? Real-time collaboration?
- Business Model: Free, freemium, subscription, or one-time? Pricing strategy? Billing approach?
- Web-Specific: SEO? Social sharing? i18n? Accessibility compliance (WCAG/ADA)?

**If cli-library:**

- Distribution: npm, pip, cargo, brew, GitHub releases? Binary vs source?
- CLI Design (if CLI): Command hierarchy? Config format? Shell completions? Cross-platform?
- Library API (if library): API design principles? Backward compatibility? SemVer strategy?

### 3. Extended Context Interview

After core questions, gather additional strategic context:

**Competitive Landscape**
- What alternatives exist today?
- How do users currently solve this problem?
- What makes your approach better/different?
- What can you learn from competitor failures/successes?

**Key Differentiators**
- What's your unique advantage or insight?
- What barriers to entry exist for competitors?
- What network effects or data advantages do you have?
- How will you maintain competitive advantage over time?

**Monetization & Sustainability**
- How will this product generate value (revenue, cost savings, strategic value)?
- What's the business model and revenue strategy?
- How will you measure ROI and success?
- What's the long-term sustainability plan?

## Output Generation

### Structured Documentation

Write comprehensive output to `docs/product-context.md` with these sections:

```markdown
# Product Context: {{project_name}}

*Generated via AI interview on [DATE]*

## Vision

[2-3 sentences capturing the core product vision and value proposition]

### Problem Statement
[Clear description of the problem being solved]

### Solution Approach
[How {{project_name}} solves the problem uniquely]

## Target User

### Primary User Persona
[Detailed description of primary user]

### Use Cases
[Key usage scenarios and workflows]

### Technical Context
[User's technical environment and constraints]

## Current State

### Development Status
[Current progress and completed work]

### Key Decisions Made
[Important technical and product decisions already locked in]

### Biggest Unknowns
[Areas of uncertainty and risk]

## Launch Criteria

### Minimum Viable Product (MVP)
[Essential features for initial launch]

### Quality Standards
[Performance, reliability, and user experience standards]

### Success Metrics
[How success will be measured]

## Monetization

### Business Model
[Revenue strategy and pricing approach, or "N/A" if not applicable]

### Value Creation
[How the product creates value for users and stakeholders]

## Non-Goals

### Explicit Exclusions
[What the product will NOT do]

### User Segments NOT Served
[Who is not the target user]

### Technical Anti-Patterns
[Approaches and technologies to avoid]

## Competitive Positioning

### Current Alternatives
[How users solve this problem today]

### Key Differentiators
[What makes this solution unique]

### Competitive Advantages
[Sustainable advantages over alternatives]

## Constraints

### Resource Constraints
[Team size, timeline, budget limitations]

### Technical Constraints
[Platform, language, infrastructure requirements]

### Business Constraints
[Regulatory, partnership, or strategic limitations]

## Archetype-Specific Strategy

Include the section below that matches the project archetype:

**For mobile-app**: Platform Strategy (app store approach, device & OS support)
**For web-app**: Web Strategy (application architecture, SEO & discovery)
**For cli-library**: Distribution Strategy (package management, API design philosophy)

---

*This document serves as the strategic foundation for all product and technical decisions. Update as the product evolves.*
```

## Interview Best Practices

### Effective Questioning
- Ask open-ended questions that encourage detailed responses
- Follow up on vague or incomplete answers
- Challenge assumptions and dig into reasoning
- Ask for specific examples and concrete scenarios

### Scope Management
- Help users focus on essential vs nice-to-have features
- Push back on scope creep during the interview
- Clarify what's truly required vs aspirational
- Identify dependencies and sequencing requirements

### Assumption Validation
- Surface and validate underlying assumptions
- Question obvious or inherited requirements
- Test alignment between stakeholders if multiple
- Identify areas where research or validation is needed

### Documentation Quality
- Capture specific, actionable information
- Avoid generic or templated language
- Include concrete examples and scenarios
- Ensure traceability from interview to written output

---

*This skill creates the strategic foundation for all subsequent product and technical work. Take time to gather comprehensive context that will guide decision-making throughout development.*