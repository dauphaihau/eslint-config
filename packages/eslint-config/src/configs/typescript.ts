import type { Config } from 'eslint/config';
import ts from 'typescript-eslint';
import type { Options } from '..';
import { strategyManager } from '../strategies';

export function typescriptConfig(options: Options = {}): Config[] {
  const tsFiles = strategyManager.getTypeScriptFiles(options);

  if (tsFiles.length === 0) {
    return [];
  }

  return [
    // Recommended TS rules (no type-checking) – fast preset
    ...ts.configs.recommended,
    // ...ts.configs.stylistic,
    // ...ts.configs.strict,

    // type-aware rules later
    // ...tseslint.configs.recommendedTypeChecked,

    // narrow the files to TS/TSX only for TS-specific rules (using strategy pattern)
    {
      files: tsFiles,
      languageOptions: {
        parser: ts.parser,
      },
      rules: {
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
            'private-instance-method',
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
      },
    },

    // Disable explicit return type requirement for config and script files
    {
      name: 'dauphaihau/typescript-explicit-return-types',
      files: ['eslint.config.*', '**/configs/**/*.ts', '**/scripts/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ];
}
