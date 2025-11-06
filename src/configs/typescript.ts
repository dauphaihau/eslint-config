import ts from 'typescript-eslint'

export function typescriptConfig() {
  return [
    // Recommended TS rules (no type-checking) – fast preset
    ...ts.configs.recommended,
    // ...ts.configs.stylistic,
    // ...ts.configs.strict,

    // type-aware rules later
    // ...tseslint.configs.recommendedTypeChecked,

    // narrow the files to TS/TSX only for TS-specific rules if you add custom ones later
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: ts.parser,
      },
      rules: {
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
      }
    },
  ]
}
