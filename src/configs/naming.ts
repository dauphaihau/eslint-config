import { Options } from '..'
import { strategyManager } from '../strategies'

export function namingConfig(options: Options = {}) {
  const allFiles = strategyManager.getSourceFiles(options)
  const tsxFiles = strategyManager.getComponentFiles(options)

  return [
    {
      name: "dauphaihau/name",
      files: allFiles,
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

      },
    },
    // TSX/JSX specific: Allow PascalCase for functions (React components)
    // Helper functions will still be camelCase due to the general rule above
    {
      name: "dauphaihau/name-tsx",
      files: tsxFiles,
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
  ]
}

