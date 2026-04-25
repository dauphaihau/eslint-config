declare module 'eslint-plugin-react-hooks' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin;
  export default plugin;
  export const configs: {
    recommended: {
      rules?: Record<string, string | unknown[]>;
    };
  };
}
