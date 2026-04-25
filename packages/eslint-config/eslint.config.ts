import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dauphaihau from './src';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const config = await dauphaihau({
  typescript: true,
});

// Pin the TS project root for editor integrations running at monorepo root.
export default config.map((cfg) => {
  if (cfg.languageOptions?.parserOptions) {
    return {
      ...cfg,
      languageOptions: {
        ...cfg.languageOptions,
        parserOptions: {
          ...cfg.languageOptions.parserOptions,
          tsconfigRootDir: resolve(dirName),
        },
      },
    };
  }

  return cfg;
});
