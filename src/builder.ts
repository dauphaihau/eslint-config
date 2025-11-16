import type { Config } from 'eslint/config'
import { baseConfig } from './configs/base'
import { maxLinesConfig } from './configs/max-lines'
import { typescriptConfig } from './configs/typescript'
import { namingConfig } from './configs/naming'
import { fileNamesConfig } from './configs/file-names'
import type { Options } from './index'

/**
 * Builder class for constructing ESLint configurations with a fluent API.
 *
 * @example
 * ```ts
 * const config = new ESLintConfigBuilder()
 *   .setOptions({ typescript: true })
 *   .withBase()
 *   .withNaming()
 *   .withMaxLines()
 *   .withFileNames()
 *   .withTypeScript()
 *   .build()
 * ```
 */
export class ESLintConfigBuilder {
  private configs: Config[] = []
  private options: Options = {}
  private baseAdded = false
  private namingAdded = false
  private maxLinesAdded = false
  private fileNamesAdded = false
  private typescriptAdded = false

  /**
   * Set options that will be used for all subsequent config additions.
   * Can be called multiple times to merge options.
   */
  setOptions(options: Options): this {
    this.options = { ...this.options, ...options }
    return this
  }

  /**
   * Add base configuration (JavaScript recommended rules, stylistic rules, ignores).
   * This is typically the first config to add.
   */
  withBase(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }
    this.configs.push(...(baseConfig(mergedOptions) as unknown as Config[]))
    this.baseAdded = true
    return this
  }

  /**
   * Add naming convention rules (camelCase, PascalCase, etc.).
   * Requires base config to be added first if using default options.
   */
  withNaming(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }
    this.configs.push(...(namingConfig(mergedOptions) as unknown as Config[]))
    this.namingAdded = true
    return this
  }

  /**
   * Add max lines rules (file and function line limits).
   * Requires base config to be added first if using default options.
   */
  withMaxLines(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }
    this.configs.push(...(maxLinesConfig(mergedOptions) as unknown as Config[]))
    this.maxLinesAdded = true
    return this
  }

  /**
   * Add file naming convention rules (kebab-case, PascalCase for components).
   * Requires base config to be added first if using default options.
   */
  withFileNames(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }
    this.configs.push(...(fileNamesConfig(mergedOptions) as unknown as Config[]))
    this.fileNamesAdded = true
    return this
  }

  /**
   * Add TypeScript-specific rules.
   * Requires typescript option to be set to true.
   */
  withTypeScript(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }
    if (!mergedOptions.typescript) {
      console.warn(
        'ESLintConfigBuilder: TypeScript config added but typescript option is not set. ' +
        'Consider calling setOptions({ typescript: true }) first.'
      )
    }
    this.configs.push(...(typescriptConfig(mergedOptions) as unknown as Config[]))
    this.typescriptAdded = true
    return this
  }

  /**
   * Add a custom config object directly.
   * Useful for adding project-specific rules or third-party configs.
   */
  withCustom(config: Config | Config[]): this {
    if (Array.isArray(config)) {
      this.configs.push(...config)
    } else {
      this.configs.push(config)
    }
    return this
  }

  /**
   * Add all standard configs (base, naming, maxLines, fileNames).
   * Optionally includes TypeScript config if typescript option is set.
   */
  withAll(options?: Options): this {
    const mergedOptions = { ...this.options, ...options }

    this.withBase(mergedOptions)
    this.withNaming(mergedOptions)
    this.withMaxLines(mergedOptions)
    this.withFileNames(mergedOptions)

    if (mergedOptions.typescript) {
      this.withTypeScript(mergedOptions)
    }

    return this
  }

  /**
   * Build and return the final ESLint configuration array.
   */
  build(): Config[] {
    return [...this.configs]
  }

  /**
   * Reset the builder to its initial state.
   * Useful for creating multiple configs with the same builder instance.
   */
  reset(): this {
    this.configs = []
    this.options = {}
    this.baseAdded = false
    this.namingAdded = false
    this.maxLinesAdded = false
    this.fileNamesAdded = false
    this.typescriptAdded = false
    return this
  }

  /**
   * Get the current options.
   */
  getOptions(): Options {
    return { ...this.options }
  }

  /**
   * Check if a specific config has been added.
   */
  hasBase(): boolean {
    return this.baseAdded
  }

  hasNaming(): boolean {
    return this.namingAdded
  }

  hasMaxLines(): boolean {
    return this.maxLinesAdded
  }

  hasFileNames(): boolean {
    return this.fileNamesAdded
  }

  hasTypeScript(): boolean {
    return this.typescriptAdded
  }
}

