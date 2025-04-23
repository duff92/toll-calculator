import path from 'node:path'

import EnvironmentPlugin from 'vite-plugin-environment'
import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'

export default defineConfig({
  plugins: [EnvironmentPlugin('all', { prefix: 'VITE_' }) as Plugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/components/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/@types', 'node_modules'],
  },
})
