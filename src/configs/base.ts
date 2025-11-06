import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import ts from 'typescript-eslint'
import { defaultIgnores } from '../utils/ignores'
import { Options } from '..'

export function baseConfig(options: Options = {}) {
  const { typescript = false } = options

  // Determine file patterns based on typescript option
  const jsFiles = ["**/*.{js,mjs,cjs,jsx}"]
  const allFiles = typescript ? ["**/*.{js,mjs,cjs,jsx,ts,tsx}"] : jsFiles

  return [
    // base JavaScript recommended rules
    {
      ...js.configs.recommended,
      files: jsFiles,
    },

    // stylistic (formatting) rules
    {
      name: "dauphaihau/stylistic",
      files: allFiles,
      ...(typescript && {
        languageOptions: {
          parser: ts.parser,
        },
      }),
      plugins: { "@stylistic": stylistic },
      rules: {
        // Spacing
        '@stylistic/func-call-spacing': 'error',
        '@stylistic/space-before-function-paren': ['error', {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        }],
        '@stylistic/space-in-parens': ['error', 'never'],
        '@stylistic/no-mixed-spaces-and-tabs': 'error',
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/type-generic-spacing': 'error',
        // '@stylistic/type-named-tuple-spacing ': 'error',

        // Semi
        '@stylistic/semi': ['error', 'always',
          {
            omitLastInOneLineBlock: true,
            omitLastInOneLineClassBody: true,
          },
        ],

        // Indent
        '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],

        // Commas
        '@stylistic/comma-dangle': ['error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        }],

        // Line breaks
        '@stylistic/object-curly-newline': ['error', {
          multiline: true,
          minProperties: 4,
          consistent: true,
        }],
        '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],

        // Quotes
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/quote-props': ['error', 'as-needed'],

        // Brackets
        '@stylistic/new-parens': 'error',
        '@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],

        // Operators
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],
        '@stylistic/no-mixed-operators': 'error',
        '@stylistic/operator-linebreak': ['error', 'after'],
        '@stylistic/dot-location': ['error', 'property'],

        // Disallow
        '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
        '@stylistic/no-floating-decimal': 'error',
        '@stylistic/no-tabs': 'off',

        // Misc
        '@stylistic/max-statements-per-line': ['error', { max: 1 }],
        '@stylistic/one-var-declaration-per-line': ['error', 'initializations'],
      },
    },

    // ignore common folders
    {
      name: 'dauphaihau/ignores',
      ignores: defaultIgnores,
    },
  ]
}
