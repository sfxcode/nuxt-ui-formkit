# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.7.0]: https://github.com/sfxcode/formkit-nuxt-ui/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/sfxcode/formkit-nuxt-ui/releases/tag/v0.6.0

