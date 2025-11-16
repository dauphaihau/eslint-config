import { ESLintConfigBuilder } from './builder'

export type Options = {
  typescript?: boolean
  react?: boolean
  vue?: boolean
}

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
export default function dauphaihau(options: Options = {}) {
  return new ESLintConfigBuilder()
    .setOptions(options)
    .withAll()
    .build()
}

/**
 * Create a new ESLint config builder instance.
 * Provides a fluent API for building custom configurations.
 *
 * @example
 * ```ts
 * import { createBuilder } from '@dauphaihau/eslint-config'
 *
 * export default createBuilder()
 *   .setOptions({ typescript: true })
 *   .withBase()
 *   .withNaming()
 *   .withTypeScript()
 *   .build()
 * ```
 */
export function createBuilder(): ESLintConfigBuilder {
  return new ESLintConfigBuilder()
}

// Export the builder class for advanced usage
export { ESLintConfigBuilder } from './builder'

// Export strategies for extensibility
export {
  type FileTypeStrategy,
  JavaScriptStrategy,
  TypeScriptStrategy,
  ReactStrategy,
  VueStrategy,
  TestStrategy,
  AllFilesStrategy,
  SourceFilesStrategy,
  ComponentFilesStrategy,
  StrategyManager,
  strategyManager,
} from './strategies'
