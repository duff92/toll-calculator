import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/.vscode',
      '**/node_modules',
      '**/build',
      '**/dist',
      '**/.github',
      '**/.idea',
      'public/mockServiceWorker.js',
    ],
  },
  // Replace the non-existent ts-prefixer with standard TypeScript recommended config
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ),
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      'jsx-a11y': jsxA11Y,
    },

    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 2022, // Update from 5 to a more modern version
      sourceType: 'module', // Change from 'script' to 'module' for ESM

      parserOptions: {
        project: ['tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]
