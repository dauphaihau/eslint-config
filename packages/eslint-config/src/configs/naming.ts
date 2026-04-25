import type { Options } from '..';
import { strategyManager } from '../strategies';
import ts from 'typescript-eslint';

const identifierQualityRules = {
  // Invalid example: const n = 'Name User'
  'id-length': [
    'warn',
    {
      min: 2,
      exceptions: ['i', 'j', 'x', 'y'],
    },
  ],
  // Discourage vague placeholder names.
  // Prefer domain-specific names such as users, payload, responseBody, or config.
  'id-denylist': ['warn', 'foo', 'bar', 'baz', 'tmp', 'arr', 'obj', 'data'],
} as const;

const variableNamingSelectors = [
  // Valid examples: userName, fetchUsers, _internalValue
  {
    selector: ['variable', 'function'],
    format: ['camelCase'],
    leadingUnderscore: 'allow', // allows _privateVar
  },
  {
    // Enforce UPPER_CASE for exported constants.
    // Valid examples: API_BASE_URL, MAX_RETRY_COUNT, DEFAULT_TIMEOUT_MS
    selector: 'variable',
    modifiers: ['const', 'exported'],
    format: ['UPPER_CASE'],
    filter: {
      regex: '^[A-Z0-9_]+$',
      match: true,
    },
  },
  // ---------- Boolean naming ----------
  {
    selector: 'variable',
    types: ['boolean'],
    format: ['PascalCase', 'camelCase'],
    prefix: ['is', 'has', 'should', 'can', 'did', 'will'],
    filter: { regex: '^(is|has|should|can|did|will)[A-Z]', match: true },
  },
] as const;

const baseNamingSelectors = [
  ...variableNamingSelectors,

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
] as const;

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
        ...identifierQualityRules,
        '@typescript-eslint/naming-convention': ['error', ...baseNamingSelectors],
      },
    },

    // TSX/JSX specific: Allow PascalCase for functions (React components) and component variables
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
        ...identifierQualityRules,
        '@typescript-eslint/naming-convention': [
          'error',
          // TSX overrides come first — same-specificity selectors use first-match wins
          {
            selector: 'function',
            format: ['PascalCase', 'camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'],
            filter: {
              regex: '^[A-Z]',
              match: true,
            },
          },
          ...baseNamingSelectors,
        ],
      },
    },
  ];
}
