import type { Options } from '..';
import { strategyManager } from '../strategies';
import ts from 'typescript-eslint';

export function namingConfig(options: Options = {}) {
  const { typescript = false } = options;

  // Naming convention rules require @typescript-eslint plugin
  // Only apply when TypeScript is enabled
  if (!typescript) {
    return [];
  }

  const sourceFiles = strategyManager.getTypeScriptFiles(options);
  const componentFiles = strategyManager.getComponentFiles(options);

  return [
    {
      name: 'dauphaihau/naming',
      files: sourceFiles,
      ignores: ['**/configs/**'], // Exclude config files from naming convention
      languageOptions: {
        parser: ts.parser,
      },
      plugins: {
        '@typescript-eslint': ts.plugin,
      },
      rules: {
        // Naming conventions
        '@typescript-eslint/naming-convention': [
          'error',

          // ---------- Variable, Function ----------
          {
            selector: ['variable', 'function'],
            format: ['camelCase'],
            leadingUnderscore: 'allow', // allows _privateVar
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


          // ---------- Interfaces ----------
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: { regex: '^I[A-Z]', match: false }, // forbid I prefix
          },

          // ---------- Type Aliases ----------
          {
            selector: 'typeAlias',
            format: ['PascalCase'], // User, UserPayload
          },

          // ---------- Classes ----------
          {
            selector: 'class',
            format: ['PascalCase'],
          },

          // ---------- Enums ----------
          {
            selector: 'enum',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'], // STATUS.OK
          },


          // ---------- Parameters ----------
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow', // allow _unused
          },


          // ---------- Properties (object keys) ----------
          {
            selector: 'objectLiteralProperty',
            format: null, // allow anything -> API response, snake_case keys allowed
          },
          {
            // internal domain types
            selector: 'typeProperty',
            format: ['camelCase'],
          },


          // ---------- Private members ----------
          {
            selector: 'classProperty',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'allow', // _value
          },

          // ---------- Boolean naming ----------
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase', 'camelCase'],
            prefix: ['is', 'has', 'should', 'can', 'did', 'will'],
            filter: { regex: '^(is|has|should|can|did|will)[A-Z]', match: true },
          },
        ],

      },
    },

    // TSX/JSX specific: Allow PascalCase for functions (React components)
    // Helper functions will still be camelCase due to the general rule above
    {
      name: 'dauphaihau/naming-tsx',
      files: componentFiles,
      languageOptions: {
        parser: ts.parser,
      },
      plugins: {
        '@typescript-eslint': ts.plugin,
      },
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'function',
            format: ['PascalCase', 'camelCase'], // Allow both for components and helpers
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'], // Allow PascalCase for component variables
            filter: {
              // Only allow PascalCase if it's likely a component (starts with uppercase)
              regex: '^[A-Z]',
              match: true,
            },
          },
        ],
      },
    },
  ];
}
