import type { Config } from 'eslint/config';
import type { Options } from '..';
import { strategyManager } from '../strategies';

export async function reactConfig(options: Options = {}): Promise<Config[]> {
  const reactFiles = strategyManager.getReactFiles(options);

  if (reactFiles.length === 0) {
    return [];
  }

  const [
    { default: react },
    { default: reactHooks },
    { default: reactRefresh },
  ] = await Promise.all([
    import('eslint-plugin-react'),
    import('eslint-plugin-react-hooks'),
    import('eslint-plugin-react-refresh'),
  ]);

  // Extract React Hooks rules safely
  const reactHooksConfig = reactHooks.configs?.recommended;
  const reactHooksRules = reactHooksConfig && 'rules' in reactHooksConfig
    ? reactHooksConfig.rules as Record<string, string | unknown[]>
    : {};

  return [
    // React recommended rules
    {
      name: 'dauphaihau/react',
      files: reactFiles,
      plugins: {
        react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          React: 'readonly',
        },
      },
      settings: {
        react: {
          version: 'detect', // Automatically detect React version
        },
      },
      rules: {
        // React plugin rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,

        // React Hooks rules
        ...reactHooksRules,

        // React Refresh rules (for Vite/development)
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // Custom React rules
        'react/prop-types': 'off', // TypeScript handles this
        'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
        'react/jsx-uses-react': 'off', // Not needed with new JSX transform
        'react/jsx-uses-vars': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-pascal-case': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'warn',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/require-render-return': 'error',
      },
    },
  ];
}

