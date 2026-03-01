import type { Config } from 'eslint/config';
import { ESLintConfigBuilder } from './builder';
import fs from 'node:fs';

export type Options = {
  typescript?: boolean
  react?: boolean
  vue?: boolean
};


const hasTsConfig =
  fs.existsSync('tsconfig.json') ||
  fs.existsSync('tsconfig.base.json');

const hasReact = (): boolean => {
  try {
    const packageJsonPath = 'package.json';
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies,
      };
      return 'react' in deps;
    }
  } catch {
    // If we can't read package.json, return false
  }
  return false;
};

/**
 * Default factory function for creating ESLint configurations.
 * Uses the builder pattern internally for consistency.
 *
 * @example
 * ```ts
 * import dauphaihau from '@dauphaihau/eslint-config'
 * export default dauphaihau({ typescript: true })
 * ```
 */
export default function dauphaihau(options: Options = {}): Promise<Config[]> {
  const finalOptions = {
    typescript: options.typescript ?? hasTsConfig,
    react: options.react ?? hasReact(),
    ...options,
  };

  return new ESLintConfigBuilder()
    .setOptions(finalOptions)
    .withAll()
    .build();
}