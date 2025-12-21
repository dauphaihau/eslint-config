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
export default function dauphaihau(options: Options = {}): Config[] {
  const finalOptions = {
    typescript: options.typescript ?? hasTsConfig,
    ...options,
  };

  return new ESLintConfigBuilder()
    .setOptions(finalOptions)
    .withAll()
    .build();
}