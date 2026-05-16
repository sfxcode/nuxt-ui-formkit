# GitHub Pages Deployment Guide

This guide explains how to deploy the Nuxt UI FormKit documentation to GitHub Pages.

## 🚀 Automatic Deployment (Recommended)

The documentation is automatically deployed to GitHub Pages when you push changes to the `docs/` folder on the `main` branch.

### Setup Steps

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Save the settings

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "docs: update documentation"
   git push origin main
   ```

3. **Monitor the deployment:**
   - Go to the **Actions** tab in your GitHub repository
   - Watch the "Deploy Docs to GitHub Pages" workflow
   - Once complete, your docs will be live at:
     ```
     https://sfxcode.github.io/nuxt-ui-formkit/
     ```

### How It Works

The deployment uses GitHub Actions workflow (`.github/workflows/deploy-docs.yml`) which:

1. **Triggers on:**
   - Pushes to `main` branch that modify files in `docs/`
   - Manual trigger from the Actions tab

2. **Build Process:**
   - Installs Node.js 20 and pnpm
   - Installs dependencies from the monorepo root
   - Generates static site with `pnpm generate`
   - Uploads the build artifact

3. **Deploy Process:**
   - Deploys the generated static site to GitHub Pages
   - Site is available at the Pages URL

## 🔧 Manual Deployment (Alternative)

If you need to deploy manually:

```bash
# Navigate to docs directory
cd docs

# Install dependencies (from root)
cd ..
pnpm install

# Generate static site
cd docs
pnpm generate

# The static files will be in docs/.output/public
# You can upload these to any static hosting service
```

## 📝 Configuration Files

### `.github/workflows/deploy-docs.yml`
GitHub Actions workflow that handles the automated deployment.

### `docs/nuxt.config.ts`
Contains the Nuxt configuration with:
- `app.baseURL`: Set via `NUXT_APP_BASE_URL` environment variable
- `nitro.prerender`: Configured for static site generation

### `docs/public/.nojekyll`
Empty file that prevents GitHub Pages from processing the site with Jekyll.

## 🌐 URL Structure

- **Production**: `https://sfxcode.github.io/nuxt-ui-formkit/`
- **Local Development**: `http://localhost:3000/`

The base URL is automatically adjusted based on the environment:
- Development: `/` (root)
- GitHub Pages: `/nuxt-ui-formkit/` (repository name)

## 🐛 Troubleshooting

### Workflow Fails

1. Check the Actions tab for error messages
2. Ensure GitHub Pages is enabled with "GitHub Actions" as source
3. Verify permissions are set correctly in workflow file

### Assets Not Loading

1. Check that `app.baseURL` is correctly configured
2. Ensure `.nojekyll` file exists in `docs/public/`
3. Clear browser cache and reload

### Changes Not Appearing

1. Wait 1-2 minutes for deployment to complete
2. Check the Actions tab to see if workflow finished
3. Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📚 Resources

- [Nuxt Static Site Generation](https://nuxt.com/docs/getting-started/deployment#static-hosting)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

