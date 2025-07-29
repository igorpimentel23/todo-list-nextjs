/* eslint-disable import/no-extraneous-dependencies */
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importHelpers from 'eslint-plugin-import-helpers';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/*.js',
      '*.js',
      '**/node_modules',
      '**/public',
      '**/.next',
      '**/.vercel',
      '**/*.tsbuildinfo',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      react,
      'import-helpers': importHelpers,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
        tailwindConfig: 'tailwind.config.ts',
      },
    },

    rules: {
      'no-underscore-dangle': 'off',
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 2,

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ],

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',

      'import-helpers/order-imports': [
        'warn',
        {
          groups: [
            '/^react$/',
            'module',
            '/^@/.+$/',
            ['parent', 'sibling', 'index'],
          ],

          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],

      'arrow-parens': ['error', 'always'],
      'react/jsx-closing-bracket-location': [1, 'line-aligned'],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'react/no-unused-prop-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      'no-restricted-exports': [
        'error',
        {
          restrictDefaultExports: {
            defaultFrom: false,
          },
        },
      ],

      'newline-before-return': 'error',

      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3,
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          suffix: ['Type'],
        },
      ],
    },
  },
];
