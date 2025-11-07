import ts from 'typescript-eslint'

export function typescriptConfig() {
  return [
    // Recommended TS rules (no type-checking) – fast preset
    ...ts.configs.recommended,
    // ...ts.configs.stylistic,
    // ...ts.configs.strict,

    // type-aware rules later
    // ...tseslint.configs.recommendedTypeChecked,

    // narrow the files to TS/TSX only for TS-specific rules
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: ts.parser,
      },
      rules: {
        // Naming conventions
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable', 'function'],
            format: ['camelCase'],
            leadingUnderscore: 'allow', // allows _privateVar
          },
          {
            selector: ['typeLike'], // class, interface, type, component
            format: ['PascalCase'],
          },
          {
            selector: 'variable', // constants (like env, config)
            modifiers: ['const'],
            format: ['UPPER_CASE'],
            filter: {
              regex: '^[A-Z0-9_]+$',
              match: true,
            },
          },
          {
            selector: 'property',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            // exception: allow external API data
            // filter: {
            //   regex: '^(_|[a-z0-9_]+)$',
            //   match: false,
            // },
          },
        ],

        // Order of members in class
        '@typescript-eslint/member-ordering': ['error', {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method'
          ],
        }],

        // No import type side effects
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        }],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
      }
    },
  ]
}
