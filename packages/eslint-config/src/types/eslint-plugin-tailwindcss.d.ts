declare module 'eslint-plugin-tailwindcss' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin & {
    configs: {
      recommended: ESLint.ConfigData;
      'flat/recommended': unknown[];
    };
  };
  export default plugin;
}
