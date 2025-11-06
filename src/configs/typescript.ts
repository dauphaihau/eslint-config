import ts from 'typescript-eslint'

export function typescriptConfig() {
  return [
    // Recommended TS rules (no type-checking) – fast preset
    ...ts.configs.recommended,
    // ...ts.configs.stylistic,
    // ...ts.configs.strict,

    // If you want type-aware rules later, you can push:
    // ...tseslint.configs.recommendedTypeChecked,
    // and add `languageOptions: { parserOptions: { projectService: true } }` with a tsconfig, etc.

    // Narrow the files to TS/TSX only for TS-specific rules if you add custom ones later:
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: ts.parser,
      },
      rules: {
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
