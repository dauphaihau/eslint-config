import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dauphaihau from '@dauphaihau/eslint-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = dauphaihau({ typescript: true });

// Set tsconfigRootDir for TypeScript parser to resolve multiple tsconfig.json files
export default config.map((cfg) => {
  if (cfg.languageOptions?.parserOptions) {
    return {
      ...cfg,
      languageOptions: {
        ...cfg.languageOptions,
        parserOptions: {
          ...cfg.languageOptions.parserOptions,
          tsconfigRootDir: resolve(__dirname),
        },
      },
    };
  }
  return cfg;
});