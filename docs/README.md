# Nuxt UI FormKit Documentation

This directory contains the VitePress documentation for Nuxt UI FormKit.

VitePress is installed as a devDependency in the root package.json.

## Development

```bash
# From project root
pnpm docs:dev          # Start dev server
pnpm docs:build        # Build docs
pnpm docs:preview      # Preview built site
```

## Root Commands

All documentation commands are run from the project root:

```bash
pnpm docs:dev          # Start dev server
pnpm docs:build        # Build docs
pnpm docs:preview      # Preview built site
```

## Structure

```
docs/
├── .vitepress/       # VitePress configuration
│   └── config.ts     # Site configuration
├── getting-started/  # Getting started guides
├── components/       # Component documentation
├── api/             # API reference
├── examples/        # Example documentation
├── public/          # Static assets
└── index.md         # Home page
```

## Content Format

This documentation uses standard VitePress markdown format:

- `::: info` - Info callouts
- `::: tip` - Tip callouts
- `::: warning` - Warning callouts
- `::: danger` - Danger callouts
- `::: code-group` - Code groups for multiple examples

## Deployment

Build the documentation for deployment:

```bash
pnpm build
```

The built files will be in `.vitepress/dist/` and can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).


