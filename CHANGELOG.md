# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.1.1

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.1.0...v1.1.1)

### 🏡 Chore

- Update release script to use patch version bumps ([beab8b4](https://github.com/sfxcode/nuxt-ui-formkit/commit/beab8b4))
- Clean up unused list tags in repeater component docs ([1090c29](https://github.com/sfxcode/nuxt-ui-formkit/commit/1090c29))
- Remove vue-i18n peer dependency and refactor translation handling in FUOutputText component ([e3af0f1](https://github.com/sfxcode/nuxt-ui-formkit/commit/e3af0f1))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.1.0

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.7...v1.1.0)

### 🚀 Enhancements

- Add support for configurable true/false values in FUCheckbox component ([e749559](https://github.com/sfxcode/nuxt-ui-formkit/commit/e749559))
- Add new props (content, mode, by, open) to FUInputMenu component ([6903e11](https://github.com/sfxcode/nuxt-ui-formkit/commit/6903e11))
- Add locale prop and readonly attribute to FUInputNumber component ([3eb9b78](https://github.com/sfxcode/nuxt-ui-formkit/commit/3eb9b78))
- Add color prop to FUListbox component for customizable styles ([175ab63](https://github.com/sfxcode/nuxt-ui-formkit/commit/175ab63))
- Add separator and type props to FUPinInput component for enhanced input customization ([502c5d6](https://github.com/sfxcode/nuxt-ui-formkit/commit/502c5d6))
- Add content prop to FUSelect component for greater customization ([5571d5c](https://github.com/sfxcode/nuxt-ui-formkit/commit/5571d5c))
- Add content and by props to FUSelectMenu component for improved customization ([7bf671c](https://github.com/sfxcode/nuxt-ui-formkit/commit/7bf671c))
- Add trueValue and falseValue props to FUSwitch component for enhanced configuration ([e5155ca](https://github.com/sfxcode/nuxt-ui-formkit/commit/e5155ca))
- Extend input definitions with additional props for greater customization ([933e3d8](https://github.com/sfxcode/nuxt-ui-formkit/commit/933e3d8))
- Add i18n support to FUOutputText component and update dependencies for vue-i18n integration ([c652402](https://github.com/sfxcode/nuxt-ui-formkit/commit/c652402))
- Document key props for input components to enhance developer guidance ([588c350](https://github.com/sfxcode/nuxt-ui-formkit/commit/588c350))
- Document outputType prop and supported values for enhanced rendering options in outputs ([fe43ec4](https://github.com/sfxcode/nuxt-ui-formkit/commit/fe43ec4))
- Add Nuxt UI references to input component documentation for easier cross-referencing ([c84d169](https://github.com/sfxcode/nuxt-ui-formkit/commit/c84d169))

### 🩹 Fixes

- Rename "delimiters" prop to "delimiter" in FUInputTags component to align with context references ([7478865](https://github.com/sfxcode/nuxt-ui-formkit/commit/7478865))

### 🏡 Chore

- Update pnpm-lock.yaml with dependency updates, including @formkit and @nuxt versions ([5ab2a39](https://github.com/sfxcode/nuxt-ui-formkit/commit/5ab2a39))
- Update release script to use minor version bumps ([da5ab80](https://github.com/sfxcode/nuxt-ui-formkit/commit/da5ab80))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.7

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.6...v1.0.7)

### 🚀 Enhancements

- Enhance FUDataDebug component with improved header and collapsible content ([e4bea3c](https://github.com/sfxcode/nuxt-ui-formkit/commit/e4bea3c))
- Implement drag-and-drop functionality for repeater component with visual feedback ([f611efc](https://github.com/sfxcode/nuxt-ui-formkit/commit/f611efc))

### 🩹 Fixes

- Update debug headers in FUDataEdit and FUDataView components for clarity ([e396df5](https://github.com/sfxcode/nuxt-ui-formkit/commit/e396df5))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.6

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.5...v1.0.6)

### 🚀 Enhancements

- Add min/max item constraints to repeater component for improved user experience ([4ebb812](https://github.com/sfxcode/nuxt-ui-formkit/commit/4ebb812))
- Add min/max item constraints to repeater documentation for enhanced user guidance ([88d1ed7](https://github.com/sfxcode/nuxt-ui-formkit/commit/88d1ed7))

### 🩹 Fixes

- Downgrade nuxt dependency version to ^4.2.2 in pnpm-lock.yaml ([328d590](https://github.com/sfxcode/nuxt-ui-formkit/commit/328d590))
- Improve button component logic with dynamic disabled states and enhance array handling in repeater ([1ed3a40](https://github.com/sfxcode/nuxt-ui-formkit/commit/1ed3a40))
- Downgrade nuxt dependencies to version 4.4.6 for compatibility ([44f54d5](https://github.com/sfxcode/nuxt-ui-formkit/commit/44f54d5))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.5

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.4...v1.0.5)

### 🚀 Enhancements

- Add playground component with JSON schema editor and update app navigation ([b7512a8](https://github.com/sfxcode/nuxt-ui-formkit/commit/b7512a8))

### 🩹 Fixes

- Update base URL and sitemap hostname for deployment ([51c56df](https://github.com/sfxcode/nuxt-ui-formkit/commit/51c56df))
- Update base URL for deployment ([5f44cc8](https://github.com/sfxcode/nuxt-ui-formkit/commit/5f44cc8))
- Update base URL for deployment ([88cae2c](https://github.com/sfxcode/nuxt-ui-formkit/commit/88cae2c))
- Update dependencies to latest versions ([593865d](https://github.com/sfxcode/nuxt-ui-formkit/commit/593865d))
- Update @nuxt/devtools to version 4.0.0-alpha.7 ([9cb0cab](https://github.com/sfxcode/nuxt-ui-formkit/commit/9cb0cab))
- Enhance form data handling with reactive watchers ([3a27829](https://github.com/sfxcode/nuxt-ui-formkit/commit/3a27829))

### 📖 Documentation

- Update navigation links and add version from package.json ([73ca8ab](https://github.com/sfxcode/nuxt-ui-formkit/commit/73ca8ab))
- Add logo SVG for application branding ([e0884f3](https://github.com/sfxcode/nuxt-ui-formkit/commit/e0884f3))

### 🏡 Chore

- Update dependencies in package.json ([b9b947b](https://github.com/sfxcode/nuxt-ui-formkit/commit/b9b947b))
- Update @vue/compiler-dom to version 3.5.35 and @vue/shared to version 3.5.35 ([3a32534](https://github.com/sfxcode/nuxt-ui-formkit/commit/3a32534))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.4

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.3...v1.0.4)

### 🚀 Enhancements

- Add Netlify configuration and SPA fallback for client-side routing ([44cb466](https://github.com/sfxcode/nuxt-ui-formkit/commit/44cb466))
- Add Netlify configuration and SPA fallback for client-side routing ([eaa6eab](https://github.com/sfxcode/nuxt-ui-formkit/commit/eaa6eab))
- Add GitHub Pages deployment guide and update nuxt.config.ts for static site generation ([fd8ae4a](https://github.com/sfxcode/nuxt-ui-formkit/commit/fd8ae4a))
- Add VitePress documentation structure with custom components and styles ([b6c7f0b](https://github.com/sfxcode/nuxt-ui-formkit/commit/b6c7f0b))
- Ignore VitePress build and cache directories in ESLint configuration ([4a6b820](https://github.com/sfxcode/nuxt-ui-formkit/commit/4a6b820))
- Add VitePress commands and update dependencies in package.json ([6cd2e76](https://github.com/sfxcode/nuxt-ui-formkit/commit/6cd2e76))
- Add playground package to pnpm workspace configuration ([a27d228](https://github.com/sfxcode/nuxt-ui-formkit/commit/a27d228))

### 🩹 Fixes

- Update Netlify publish path to point to 'playground/dist' ([3a08cfc](https://github.com/sfxcode/nuxt-ui-formkit/commit/3a08cfc))

### 💅 Refactors

- Clean up repeater-sample.vue and plugin.ts by removing unused imports ([3ea9e9a](https://github.com/sfxcode/nuxt-ui-formkit/commit/3ea9e9a))
- Clean up repeater-sample.vue and plugin.ts by removing unused imports ([7f7315b](https://github.com/sfxcode/nuxt-ui-formkit/commit/7f7315b))

### 🏡 Chore

- Remove packageManager field from package.json ([3f5c111](https://github.com/sfxcode/nuxt-ui-formkit/commit/3f5c111))
- Remove packageManager field from package.json ([65d5a76](https://github.com/sfxcode/nuxt-ui-formkit/commit/65d5a76))
- Update dependencies in package.json ([c8b9057](https://github.com/sfxcode/nuxt-ui-formkit/commit/c8b9057))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.3

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.2...v1.0.3)

### 🚀 Enhancements

- Update repeater component with improved default values and internal class handling ([4085e06](https://github.com/sfxcode/nuxt-ui-formkit/commit/4085e06))
- Update repeater sample component with modified default values and improved list structure ([082a8ef](https://github.com/sfxcode/nuxt-ui-formkit/commit/082a8ef))
- Enhance repeater component with new input handling and improved list structure ([ca4a56c](https://github.com/sfxcode/nuxt-ui-formkit/commit/ca4a56c))
- Add initial project setup for documentation with configuration files and example components ([7368a6e](https://github.com/sfxcode/nuxt-ui-formkit/commit/7368a6e))
- Update README with repeater component details and enhance composables section ([6330e57](https://github.com/sfxcode/nuxt-ui-formkit/commit/6330e57))

### 🏡 Chore

- Update dependencies to latest versions in package.json ([e5f41ca](https://github.com/sfxcode/nuxt-ui-formkit/commit/e5f41ca))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.2

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v1.0.1...v1.0.2)

### 🚀 Enhancements

- Add comprehensive forms for checkout, contact, event registration, job application, and user profile as real world examples ([d3d5e12](https://github.com/sfxcode/nuxt-ui-formkit/commit/d3d5e12))
- Enhance repeater component with improved button handling and dynamic sizing ([d79b194](https://github.com/sfxcode/nuxt-ui-formkit/commit/d79b194))
- Update repeater sample component with enhanced button configurations and dynamic class assignments ([43a8e04](https://github.com/sfxcode/nuxt-ui-formkit/commit/43a8e04))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v1.0.1

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.11.0...v1.0.1)

### 🚀 Enhancements

- Add nuxtUIRepeaterDefinition for dynamic list handling in forms - no more need for useFormKitRepeater.ts - all is handled in the repeater directly ([94626c4](https://github.com/sfxcode/nuxt-ui-formkit/commit/94626c4))
- Enhance repeater functionality in repeater-sample.vue - replace useFormKitRepeater with nuxtUIRepeater for improved dynamic list management ([c9695bd](https://github.com/sfxcode/nuxt-ui-formkit/commit/c9695bd))

### 🩹 Fixes

- Simplify class handling in addElementsInOuterDiv function ([b5361db](https://github.com/sfxcode/nuxt-ui-formkit/commit/b5361db))

### 💅 Refactors

- Improve type safety in repeater context methods by specifying FormKitNode type ([b1f1fca](https://github.com/sfxcode/nuxt-ui-formkit/commit/b1f1fca))
- Enhance type safety in addRepeaterHandler by replacing 'any' with 'unknown' in swapElements and related functions ([7d6cb95](https://github.com/sfxcode/nuxt-ui-formkit/commit/7d6cb95))
- Remove default class names from FormKit elements in useFormKitSchema tests ([d646f6b](https://github.com/sfxcode/nuxt-ui-formkit/commit/d646f6b))

### 🏡 Chore

- Update version to 1.0.0 and adjust release script for patch versioning ([bca1e72](https://github.com/sfxcode/nuxt-ui-formkit/commit/bca1e72))
- Update package manager to pnpm@11.0.9 and add pnpm workspace configuration ([17b3698](https://github.com/sfxcode/nuxt-ui-formkit/commit/17b3698))
- Remove unused dependencies from Vite configuration in nuxt.config.ts ([c6df915](https://github.com/sfxcode/nuxt-ui-formkit/commit/c6df915))
- Remove example from test ([f92a57e](https://github.com/sfxcode/nuxt-ui-formkit/commit/f92a57e))
- Remove example from test ([c468e5d](https://github.com/sfxcode/nuxt-ui-formkit/commit/c468e5d))
- Update dependencies in package.json and pnpm-lock.yaml ([b3b24c0](https://github.com/sfxcode/nuxt-ui-formkit/commit/b3b24c0))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.11.0

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.10.0...v0.11.0)

### 🚀 Enhancements

- Enable experimental viteEnvironmentApi in nuxt.config.ts - fixes problem with actual nuxt 4.4.4 version and ssr: false ([3713c89](https://github.com/sfxcode/nuxt-ui-formkit/commit/3713c89))

### 🩹 Fixes

- Update project title in README for clarity ([ffd5764](https://github.com/sfxcode/nuxt-ui-formkit/commit/ffd5764))
- Clarify usage of nuxtUIListbox in README ([27e7599](https://github.com/sfxcode/nuxt-ui-formkit/commit/27e7599))
- Update dependencies in package.json for compatibility and improvements ([d0d3fd8](https://github.com/sfxcode/nuxt-ui-formkit/commit/d0d3fd8))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.10.0

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.9.2...v0.10.0)

### 🩹 Fixes

- Update release script to use major version bump for changelog ([1a05662](https://github.com/sfxcode/nuxt-ui-formkit/commit/1a05662))

### 🏡 Chore

- Add jobs section to CI configuration ([0d2f041](https://github.com/sfxcode/nuxt-ui-formkit/commit/0d2f041))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.9.2

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.9.1...v0.9.2)

### 🚀 Enhancements

- Enhance Listbox component with transfer mode and additional props ror transfer list ([1209fcb](https://github.com/sfxcode/nuxt-ui-formkit/commit/1209fcb))
- Add transfer mode to Listbox component with new schema and example ([a05446d](https://github.com/sfxcode/nuxt-ui-formkit/commit/a05446d))
- Update Listbox component documentation and add success styling ([25b0d05](https://github.com/sfxcode/nuxt-ui-formkit/commit/25b0d05))

### 🩹 Fixes

- Update footer to reflect Nuxt UI version 4.7.0 ([7932e54](https://github.com/sfxcode/nuxt-ui-formkit/commit/7932e54))

### 💅 Refactors

- Clean up Listbox component by removing debug data and updating types for transfer lists ([99066fa](https://github.com/sfxcode/nuxt-ui-formkit/commit/99066fa))

### 🏡 Chore

- Update dependencies and package manager version NuxtUI 4.7.0 ([ead6c64](https://github.com/sfxcode/nuxt-ui-formkit/commit/ead6c64))
- Add Vite optimization for FormKit dependencies in nuxt.config.ts ([ced8854](https://github.com/sfxcode/nuxt-ui-formkit/commit/ced8854))
- Add Listbox component and update input definitions ([0e6566b](https://github.com/sfxcode/nuxt-ui-formkit/commit/0e6566b))
- Add Listbox component with filtering, grouping, and multiple selection ([fca865a](https://github.com/sfxcode/nuxt-ui-formkit/commit/fca865a))
- Update CI configuration to remove lint job and upgrade Node.js version to 24 ([d3e4e55](https://github.com/sfxcode/nuxt-ui-formkit/commit/d3e4e55))
- Update release script to use minor versioning for changelogen ([2919f03](https://github.com/sfxcode/nuxt-ui-formkit/commit/2919f03))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.9.1

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.9.0...v0.9.1)

### 🏡 Chore

- Update CI configuration to use pnpm and latest action versions ([e458664](https://github.com/sfxcode/nuxt-ui-formkit/commit/e458664))
- Update release script to use patch versioning for changelogen ([917e050](https://github.com/sfxcode/nuxt-ui-formkit/commit/917e050))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.9.0

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.7...v0.9.0)

### 🏡 Chore

- Remove work in progress notice from README ([f2563bb](https://github.com/sfxcode/nuxt-ui-formkit/commit/f2563bb))
- Update release script and bump devDependencies to latest versions ([b693a16](https://github.com/sfxcode/nuxt-ui-formkit/commit/b693a16))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.7

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.6...v0.8.7)

### 🏡 Chore

- Update dependencies to latest versions ([6a06e01](https://github.com/sfxcode/nuxt-ui-formkit/commit/6a06e01))
- Update package manager to pnpm@10.33.0 ([e89039e](https://github.com/sfxcode/nuxt-ui-formkit/commit/e89039e))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.6

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.5...v0.8.6)

### 🏡 Chore

- Update package dependencies to latest versions - @nuxt/ui 4.6.0 ([39b82a1](https://github.com/sfxcode/nuxt-ui-formkit/commit/39b82a1))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.5

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.4...v0.8.5)

## v0.8.4

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.3...v0.8.4)

### 🚀 Enhancements

- Disable server-side rendering in nuxt configuration ([a2b9bba](https://github.com/sfxcode/nuxt-ui-formkit/commit/a2b9bba))

### 🏡 Chore

- Update package dependencies to latest versions ([184f1df](https://github.com/sfxcode/nuxt-ui-formkit/commit/184f1df))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.3

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.2...v0.8.3)

### 🚀 Enhancements

- Add default values to readonly and disabled time inputs ([edd316a](https://github.com/sfxcode/nuxt-ui-formkit/commit/edd316a))

### 🩹 Fixes

- Update checkbox group components with indicator prop ([1b83d1f](https://github.com/sfxcode/nuxt-ui-formkit/commit/1b83d1f))

### 🏡 Chore

- Add Netlify configuration file for build and redirects ([6cbf11b](https://github.com/sfxcode/nuxt-ui-formkit/commit/6cbf11b))
- Update Netlify build command to include preparation step ([e8aadc1](https://github.com/sfxcode/nuxt-ui-formkit/commit/e8aadc1))
- Update dependencies in package.json ([5b79a4c](https://github.com/sfxcode/nuxt-ui-formkit/commit/5b79a4c))

### ✅ Tests

- Add unit tests for useFormKitSchema, useFormKitInput, and useFormKitOutput ([11866ac](https://github.com/sfxcode/nuxt-ui-formkit/commit/11866ac))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.2

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.8.1...v0.8.2)

### 🏡 Chore

- Rename package to @sfxcode/nuxt-ui-formkit ([fd8bbb9](https://github.com/sfxcode/nuxt-ui-formkit/commit/fd8bbb9))
- Rename package to @sfxcode/nuxt-ui-formkit and update references ([53ef29b](https://github.com/sfxcode/nuxt-ui-formkit/commit/53ef29b))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.8.1

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.11...v0.8.1)

### 🏡 Chore

- Bump version to 0.8.0 and update release script for patch versioning ([e0e56c6](https://github.com/sfxcode/nuxt-ui-formkit/commit/e0e56c6))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.11

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.10...v0.7.11)

## v0.7.10

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.8...v0.7.10)

### 🚀 Enhancements

- Add FormKit repeater component for dynamic list management ([c63c6ca](https://github.com/sfxcode/nuxt-ui-formkit/commit/c63c6ca))
- Add UButton component for use in FormKit repeater ([4134b20](https://github.com/sfxcode/nuxt-ui-formkit/commit/4134b20))

### 💅 Refactors

- Update import paths and re-export definitions for better accessibility ([d35932f](https://github.com/sfxcode/nuxt-ui-formkit/commit/d35932f))
- Wrap FormKit components in div for improved structure ([f56cd1b](https://github.com/sfxcode/nuxt-ui-formkit/commit/f56cd1b))
- Wrap content in client-only component for improved rendering ([2dbe95e](https://github.com/sfxcode/nuxt-ui-formkit/commit/2dbe95e))
- Rename repeater component to repeater-sample for clarity ([920f648](https://github.com/sfxcode/nuxt-ui-formkit/commit/920f648))

### 🏡 Chore

- **release:** Bump version to 0.7.9 ([c132ed0](https://github.com/sfxcode/nuxt-ui-formkit/commit/c132ed0))
- Update release script to use minor versioning for changelogen ([b1cd5a0](https://github.com/sfxcode/nuxt-ui-formkit/commit/b1cd5a0))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.8

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.7...v0.7.8)

### 💅 Refactors

- Update import paths and remove deprecated formkit configuration ([15bc4d0](https://github.com/sfxcode/nuxt-ui-formkit/commit/15bc4d0))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.7

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.6...v0.7.7)

### 💅 Refactors

- Update import paths and restructure definitions for better organization ([59a7614](https://github.com/sfxcode/nuxt-ui-formkit/commit/59a7614))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.6

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.5...v0.7.6)

### 🚀 Enhancements

- Add runtime definitions and plugins to package.json ([10e46d4](https://github.com/sfxcode/nuxt-ui-formkit/commit/10e46d4))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.5

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.4...v0.7.5)

### 🚀 Enhancements

- Enhance form components to support dynamic slot rendering with validSlotNames ([565f385](https://github.com/sfxcode/nuxt-ui-formkit/commit/565f385))
- Add runtime types and import paths to package.json ([f3b1d65](https://github.com/sfxcode/nuxt-ui-formkit/commit/f3b1d65))
- Add examples for FormKit usage without schema and slots in FormKit components ([06df146](https://github.com/sfxcode/nuxt-ui-formkit/commit/06df146))

### 📖 Documentation

- Add screenshot of FormKit Nuxt UI to README ([445894c](https://github.com/sfxcode/nuxt-ui-formkit/commit/445894c))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.4

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.3...v0.7.4)

### 🚀 Enhancements

- Normalize color input handling and improve hex validation in colorConverter ([8c4e870](https://github.com/sfxcode/nuxt-ui-formkit/commit/8c4e870))
- Implement output components schema and enhance data display in FUDataView ([2977a75](https://github.com/sfxcode/nuxt-ui-formkit/commit/2977a75))

### 🩹 Fixes

- Correct type check for Nuxt UI output components in addNuxtAsteriskPlugin ([ea93b24](https://github.com/sfxcode/nuxt-ui-formkit/commit/ea93b24))

### ✅ Tests

- Add comprehensive tests for color and duration conversion utilities ([f05e70d](https://github.com/sfxcode/nuxt-ui-formkit/commit/f05e70d))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.3

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.2...v0.7.3)

### 🚀 Enhancements

- Add support for multiple output types in FUOutputText component ([ef41a71](https://github.com/sfxcode/nuxt-ui-formkit/commit/ef41a71))
- Extend FormKitInputProps with additional Nuxt UI input and output components ([941f82b](https://github.com/sfxcode/nuxt-ui-formkit/commit/941f82b))
- Add Nuxt UI input and output components to FormKitInputProps to runtime index.ts ([9c6558a](https://github.com/sfxcode/nuxt-ui-formkit/commit/9c6558a))

### 🩹 Fixes

- Update icon class binding in FUIcon components ([9df6727](https://github.com/sfxcode/nuxt-ui-formkit/commit/9df6727))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.2

[compare changes](https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.7.1...v0.7.2)

### 🩹 Fixes

- Update release script to publish with public access ([f61946a](https://github.com/sfxcode/nuxt-ui-formkit/commit/f61946a))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## v0.7.1


### 🚀 Enhancements

- Initialize Nuxt module with basic setup and configuration ([69c7991](https://github.com/sfxcode/nuxt-ui-formkit/commit/69c7991))
- Update package.json for FormKit integration and bump @nuxt/test-utils version ([8a79a1f](https://github.com/sfxcode/nuxt-ui-formkit/commit/8a79a1f))
- Update nuxt.config.ts to include myModule and fix modules syntax ([c8e9bc6](https://github.com/sfxcode/nuxt-ui-formkit/commit/c8e9bc6))
- Add @formkit/nuxt dependency to package.json and update pnpm-lock.yaml ([1283fbc](https://github.com/sfxcode/nuxt-ui-formkit/commit/1283fbc))
- Rename module to nuxt-ui-formkit and update compatibility for Nuxt 4.0.0 ([594f706](https://github.com/sfxcode/nuxt-ui-formkit/commit/594f706))
- Add @nuxt/ui dependency to package.json ([1c194c9](https://github.com/sfxcode/nuxt-ui-formkit/commit/1c194c9))
- Add initial app structure with Nuxt UI components and configuration ([8c82a8e](https://github.com/sfxcode/nuxt-ui-formkit/commit/8c82a8e))
- Add @iconify-json/lucide and @iconify-json/simple-icons dependencies to package.json and update pnpm-lock.yaml ([0ffbd2d](https://github.com/sfxcode/nuxt-ui-formkit/commit/0ffbd2d))
- Update links and structure in app.vue and index.vue for FormKit Nuxt UI ([ae0c826](https://github.com/sfxcode/nuxt-ui-formkit/commit/ae0c826))
- Implement Nuxt UI components and configuration for FormKit integration ([0137028](https://github.com/sfxcode/nuxt-ui-formkit/commit/0137028))
- Enhance input and textarea components with new configurations and styles ([529c8ef](https://github.com/sfxcode/nuxt-ui-formkit/commit/529c8ef))
- Add new FormKit components (FUCheckbox, FUSelect) and enhance existing inputs with additional props and styles ([d212815](https://github.com/sfxcode/nuxt-ui-formkit/commit/d212815))
- Add output definitions for boolean, date, and text types ([c9e230a](https://github.com/sfxcode/nuxt-ui-formkit/commit/c9e230a))
- Add event handler for data saved in index.vue ([904cc7a](https://github.com/sfxcode/nuxt-ui-formkit/commit/904cc7a))
- Add checkbox component with various configurations and states ([b5e10cf](https://github.com/sfxcode/nuxt-ui-formkit/commit/b5e10cf))
- Update component configurations and improve input handling ([48424b7](https://github.com/sfxcode/nuxt-ui-formkit/commit/48424b7))
- Enhance FUCheckbox component with additional props and improved handling ([39025b8](https://github.com/sfxcode/nuxt-ui-formkit/commit/39025b8))
- Update input component definitions with additional props and improved handling ([1fa7d98](https://github.com/sfxcode/nuxt-ui-formkit/commit/1fa7d98))
- Enhance checkbox and input components with additional props and improved configurations ([a27e08e](https://github.com/sfxcode/nuxt-ui-formkit/commit/a27e08e))
- Add ui prop to FUInput component for enhanced customization ([90b60ba](https://github.com/sfxcode/nuxt-ui-formkit/commit/90b60ba))
- Add ui prop to nuxtUIInputDefinition for enhanced customization ([cd35b19](https://github.com/sfxcode/nuxt-ui-formkit/commit/cd35b19))
- Enhance FUInputDate component with additional props for improved customization ([454c90f](https://github.com/sfxcode/nuxt-ui-formkit/commit/454c90f))
- Enhance input date component with additional props for improved functionality and customization ([1505d64](https://github.com/sfxcode/nuxt-ui-formkit/commit/1505d64))
- Update input menu component with new props for enhanced functionality and customization ([20b947b](https://github.com/sfxcode/nuxt-ui-formkit/commit/20b947b))
- Enhance FUInput, FUInputMenu, and FUInputTags components with new props for improved customization and functionality ([c52d46e](https://github.com/sfxcode/nuxt-ui-formkit/commit/c52d46e))
- Enhance input tags and time components with new props for improved customization and functionality ([acb593d](https://github.com/sfxcode/nuxt-ui-formkit/commit/acb593d))
- Enhance pin input component with new props for autofocus, highlight, and fixed positioning ([ceb5599](https://github.com/sfxcode/nuxt-ui-formkit/commit/ceb5599))
- Update radio group and checkbox components with new props for improved customization and flexibility ([e0fa636](https://github.com/sfxcode/nuxt-ui-formkit/commit/e0fa636))
- Enhance select component with new props for autofocus, arrow icon, highlight, and fixed positioning ([294f58f](https://github.com/sfxcode/nuxt-ui-formkit/commit/294f58f))
- Enhance slider component with new props for inverted direction and minimum steps between thumbs ([552fbaf](https://github.com/sfxcode/nuxt-ui-formkit/commit/552fbaf))
- Enhance switch component with new props for checked and unchecked icons ([0344de3](https://github.com/sfxcode/nuxt-ui-formkit/commit/0344de3))
- Enhance textarea component with new props for fixed positioning and autoresize delay ([f14f361](https://github.com/sfxcode/nuxt-ui-formkit/commit/f14f361))
- Enhance textarea component with new props for fixed positioning and autoresize delay ([5ad83c2](https://github.com/sfxcode/nuxt-ui-formkit/commit/5ad83c2))
- Add output link component and enhance select menu with search input and fixed positioning ([95cda62](https://github.com/sfxcode/nuxt-ui-formkit/commit/95cda62))
- Add output link component and enhance select menu with search input and fixed positioning ([8ead6ab](https://github.com/sfxcode/nuxt-ui-formkit/commit/8ead6ab))
- Enhance output components with icon props and click handlers ([c85e056](https://github.com/sfxcode/nuxt-ui-formkit/commit/c85e056))
- Enhance output components with icon props and click handlers ([e72e1f5](https://github.com/sfxcode/nuxt-ui-formkit/commit/e72e1f5))
- Add badge list type to output list component and update schema references ([3f27f6b](https://github.com/sfxcode/nuxt-ui-formkit/commit/3f27f6b))
- Add InputNumber component with extensive configuration options and examples ([ceff63b](https://github.com/sfxcode/nuxt-ui-formkit/commit/ceff63b))
- Add InputNumber and OutputList components to app navigation ([af47fc0](https://github.com/sfxcode/nuxt-ui-formkit/commit/af47fc0))
- Add CHANGELOG.md to document project updates and version history ([d13780c](https://github.com/sfxcode/nuxt-ui-formkit/commit/d13780c))
- Add MIT License and update README with work in progress notice ([b9ff7da](https://github.com/sfxcode/nuxt-ui-formkit/commit/b9ff7da))
- Enhance useFormKitRepeater with type safety and improved data handling ([768fc90](https://github.com/sfxcode/nuxt-ui-formkit/commit/768fc90))
- Enhance type safety in FUInputTime, FUSelect, FUSelectMenu, and useFormKitSchema components ([94f9cb4](https://github.com/sfxcode/nuxt-ui-formkit/commit/94f9cb4))

### 🩹 Fixes

- Update formkit-label color for improved accessibility ([ad9fad1](https://github.com/sfxcode/nuxt-ui-formkit/commit/ad9fad1))
- Update release script to use patch versioning in changelogen ([a7fa010](https://github.com/sfxcode/nuxt-ui-formkit/commit/a7fa010))

### 💅 Refactors

- Rename 'items' to 'options' for consistency in select components ([594dee1](https://github.com/sfxcode/nuxt-ui-formkit/commit/594dee1))
- Remove unused import from FUDataEdit.vue and clean up module.ts ([48b89b8](https://github.com/sfxcode/nuxt-ui-formkit/commit/48b89b8))

### 🏡 Chore

- Update package dependencies to latest versions ([cd73273](https://github.com/sfxcode/nuxt-ui-formkit/commit/cd73273))
- Update package manager version and add @iconify-json/heroicons dependency ([328b8e7](https://github.com/sfxcode/nuxt-ui-formkit/commit/328b8e7))
- Update package manager version and add @iconify-json/heroicons dependency ([12783f3](https://github.com/sfxcode/nuxt-ui-formkit/commit/12783f3))
- Refactorings ([6a879d7](https://github.com/sfxcode/nuxt-ui-formkit/commit/6a879d7))
- Update devDependencies to latest versions ([b47a641](https://github.com/sfxcode/nuxt-ui-formkit/commit/b47a641))
- Update packageManager version to pnpm@10.30.1 ([20e238b](https://github.com/sfxcode/nuxt-ui-formkit/commit/20e238b))

### ❤️ Contributors

- Sfxcode ([@sfxcode](https://github.com/sfxcode))

## [0.7.0] - 2026-02-21

### Added

- **InputNumber Component**: New FormKit-wrapped UInputNumber component with:
  - Full Nuxt UI integration
  - Number formatting support (currency, percentage, decimals)
  - Increment/decrement buttons with customization
  - Min/max/step controls with step snapping
  - Horizontal and vertical orientations
  - Mouse wheel control options
  - Comprehensive sample page with 37 examples

- **OutputList Component**: Enhanced list display component with:
  - Badge list type using UBadge components
  - Space separator option
  - Multiple list formats (span, div, ul, ol, badge)
  - Various separators (comma, semicolon, pipe, dash, space)
  - Comprehensive sample page with examples

### Changed

- Renamed `tags` list type to `badge` in OutputList for better clarity
- Updated all component definitions to align with Nuxt UI 4.3.0 props
- Enhanced navigation menu with links to all sample pages

### Fixed

- ESLint formatting issues in component files
- Type compatibility between FormKit variants and UBadge variants

## [0.6.0] - 2024-12-XX

### Added

- Initial release with 15 input components
- 6 output components
- Form management components (FUDataEdit, FUDataView, FUDataDebug)
- Composables for form utilities
- TypeScript support
- SSR compatibility
- Auto-imports for components and composables

### Components

**Input Components:**
- Checkbox
- CheckboxGroup
- ColorPicker
- Input
- InputDate
- InputMenu
- InputTags
- InputTime
- PinInput
- RadioGroup
- Select
- SelectMenu
- Slider
- Switch
- Textarea

**Output Components:**
- OutputBoolean
- OutputDate
- OutputLink
- OutputList
- OutputNumber
- OutputText

**Form Components:**
- FUDataEdit
- FUDataView
- FUDataDebug

**Composables:**
- useFormKitInput
- useFormKitOutput
- useFormKitRepeater
- useFormKitSchema

[0.7.0]: https://github.com/sfxcode/nuxt-ui-formkit/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/sfxcode/nuxt-ui-formkit/releases/tag/v0.6.0

