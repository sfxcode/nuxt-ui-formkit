# GitHub Copilot Instructions for formkit-nuxt-ui

## Project Overview
This is a Nuxt module that integrates FormKit with Nuxt UI components. The module provides seamless integration between FormKit form handling and Nuxt UI's design system.

## Technology Stack
- **Framework**: Nuxt 4.x
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Testing**: Vitest
- **Linting**: ESLint 9
- **Build Tool**: @nuxt/module-builder
- **Key Dependencies**:
  - @nuxt/ui 4.3.0
  - @nuxt/kit for module development
  - Vue 3 with Composition API

## Project Structure
- `/src/module.ts` - Main module definition and setup
- `/src/runtime/` - Runtime code that gets bundled with the module
  - `plugin.ts` - Nuxt plugin for client-side initialization
- `/playground/` - Development playground for testing the module
- `/test/` - Vitest test files and fixtures

## Coding Standards & Best Practices

### TypeScript
- Use strict TypeScript with proper type annotations
- Export interfaces for all module options
- Leverage Nuxt's auto-imports (no need to import composables like `useNuxtApp`, `useState`, etc.)
- Use `#app` and `#imports` for Nuxt-specific imports

### Nuxt Module Development
- Follow Nuxt Module Best Practices
- Use `@nuxt/kit` utilities for module operations:
  - `addPlugin()` for registering plugins
  - `addComponent()` for auto-importing components
  - `addImports()` for auto-importing composables
  - `createResolver()` for resolving paths
- Always use `defineNuxtModule<ModuleOptions>()` with typed options
- Module meta should include `name` and `configKey`

### Vue/Nuxt Component Guidelines
- Use `<script setup>` syntax for all Vue components
- Prefer Composition API over Options API
- Use TypeScript with `<script setup lang="ts">`
- Follow Nuxt 3+ auto-import conventions
- Use Nuxt UI components when building UI

### Nuxt UI Integration
- **Version**: This project uses @nuxt/ui 4.3.0
- **Component Usage**: Leverage Nuxt UI components for consistent design system integration
- **FormKit Integration**: Map FormKit input types to appropriate Nuxt UI components
- **Theming**: Respect Nuxt UI's color modes (light/dark) and theme configuration
- **Component Props**: Follow Nuxt UI's prop patterns and naming conventions
- **Icons**: Use Nuxt UI's icon integration (typically with `@iconify/vue` or similar)
- **Accessibility**: Maintain Nuxt UI's built-in accessibility features when creating custom integrations
- **Utilities**: Use Nuxt UI utilities and composables (e.g., `useToast`, `useModal`, `useColorMode`)
- **Styling**: Prefer Nuxt UI's utility classes and design tokens over custom CSS
- **Documentation**: Reference [Nuxt UI documentation](https://ui.nuxt.com/) for component APIs and patterns
- **Component Examples**: Common Nuxt UI components to integrate with FormKit:
  - `UInput` - Text inputs
  - `UTextarea` - Multi-line text
  - `USelect` - Dropdowns and selects
  - `UCheckbox` - Checkboxes
  - `URadio` - Radio buttons
  - `UButton` - Submit buttons and actions
  - `UFormGroup` - Form field wrappers with labels and help text
  - `UAlert` - Error and validation messages

### Code Style
- Use 2-space indentation
- Use single quotes for strings
- Add trailing commas in objects and arrays
- Follow ESLint configuration (@nuxt/eslint-config)
- No semicolons (as per typical Vue/Nuxt conventions)

### Conventional Commits
- **Format**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages
- **Structure**: `<type>[optional scope]: <description>`
- **Types**:
  - `feat:` - New features (triggers minor version bump)
  - `fix:` - Bug fixes (triggers patch version bump)
  - `docs:` - Documentation changes only
  - `style:` - Code style changes (formatting, missing semicolons, etc.)
  - `refactor:` - Code changes that neither fix bugs nor add features
  - `perf:` - Performance improvements
  - `test:` - Adding or updating tests
  - `chore:` - Maintenance tasks, dependency updates, build config
  - `ci:` - CI/CD configuration changes
  - `build:` - Build system or external dependency changes
- **Breaking Changes**: Use `BREAKING CHANGE:` in the footer or add `!` after type/scope (e.g., `feat!:` or `feat(api)!:`)
- **Scope Examples**: `feat(formkit):`, `fix(plugin):`, `docs(readme):`, `chore(deps):`
- **Examples**:
  - `feat: add UInput integration for FormKit text inputs`
  - `fix(plugin): resolve SSR hydration mismatch`
  - `docs: update installation instructions`
  - `chore(deps): upgrade @nuxt/ui to 4.3.0`
  - `feat!: change module configuration API`
- **Best Practices**:
  - Keep the subject line under 72 characters
  - Use imperative mood ("add" not "added" or "adds")
  - Don't capitalize the first letter of the description
  - No period at the end of the subject line
  - Provide detailed explanation in the body if needed
  - Reference issues/PRs in the footer (e.g., `Fixes #123`, `Closes #456`)

### Testing
- Write tests using Vitest
- Use `@nuxt/test-utils` for Nuxt-specific testing
- Place fixtures in `/test/fixtures/`
- Test files should end with `.test.ts`

## Module-Specific Guidelines

### When Adding Features
- Consider both runtime and build-time implications
- Document new module options in the `ModuleOptions` interface
- Update README.md with usage examples
- Add corresponding tests in `/test/`
- Test in the playground before release

### Plugin Development
- Plugins should use `defineNuxtPlugin()`
- Consider plugin execution order (client vs server)
- Use proper error handling for runtime errors

### Type Safety
- Export all public types from `module.ts`
- Provide IntelliSense-friendly option definitions
- Use module augmentation for extending Nuxt types when needed

## Common Patterns

### Adding a Module Option
```typescript
export interface ModuleOptions {
  // Option description
  optionName?: string
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    optionName: 'default-value'
  },
  setup(options, nuxt) {
    // Use options.optionName
  }
})
```

### Registering a Component
```typescript
import { addComponent } from '@nuxt/kit'

addComponent({
  name: 'ComponentName',
  filePath: resolver.resolve('./runtime/components/ComponentName.vue')
})
```

### Adding a Composable
```typescript
import { addImports } from '@nuxt/kit'

addImports({
  name: 'useMyComposable',
  from: resolver.resolve('./runtime/composables/useMyComposable')
})
```

## Development Commands
- `pnpm dev` - Start development server with playground
- `pnpm dev:prepare` - Prepare module for development (run after clean install)
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm build` - Build the module for production

## Important Notes
- This module is designed to work with Nuxt 4.x
- The module should be framework-agnostic where possible
- Always consider both SSR and client-side rendering scenarios
- Keep bundle size minimal - only include necessary runtime code
- Follow semantic versioning for releases

## When Suggesting Code
- Prioritize Nuxt 4 APIs and patterns
- Use modern Vue 3 Composition API patterns
- Ensure TypeScript types are properly defined
- Consider SSR compatibility
- Follow the existing code style in the project
- Suggest testing strategies alongside implementation

## Component Generation for Nuxt components
- When generating components that wrap Nuxt UI components, ensure to:
  - Use `<script setup lang="ts">`
  - Properly type props and emits
  - Ignore Properties that are not relevant to the FormKit integration: name, required

