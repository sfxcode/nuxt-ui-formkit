import { fileURLToPath } from 'node:url'
import { defineVitestProject } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [vue()],
        test: {
          name: 'unit',
          exclude: ['**/node_modules/**', 'test/**/*.nuxt.test.ts'],
        },
      },
      // Nuxt UI components (UButton, UInput, ...) read `useAppConfig` from
      // Nuxt's virtual `#imports` module, which only exists inside a running
      // Nuxt app - so any test that mounts a FU*.vue wrapper (or a schema
      // referencing a Nuxt UI component) runs in a real Nuxt context via
      // @nuxt/test-utils, pointed at playground/ where this module is wired up.
      defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/**/*.nuxt.test.ts'],
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
              // Reuse the jsdom devDependency already in the project instead
              // of adding happy-dom (the environment's default) as a second
              // DOM implementation.
              domEnvironment: 'jsdom',
            },
          },
        },
      }),
    ],
  },
})
