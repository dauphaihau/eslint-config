import type { Options } from '../index'

/**
 * Strategy interface for handling file type-specific configurations.
 * Each strategy knows how to determine file patterns and apply rules
 * for a specific file type or framework.
 */
export interface FileTypeStrategy {
  /**
   * Get file patterns that this strategy applies to.
   */
  getFilePatterns(options: Options): string[]

  /**
   * Get the name identifier for this strategy.
   */
  getName(): string

  /**
   * Check if this strategy should be applied based on options.
   */
  shouldApply(options: Options): boolean
}

/**
 * Base strategy for JavaScript files.
 */
export class JavaScriptStrategy implements FileTypeStrategy {
  getName(): string {
    return 'javascript'
  }

  getFilePatterns(options: Options): string[] {
    return ['**/*.{js,mjs,cjs,jsx}']
  }

  shouldApply(options: Options): boolean {
    return true // Always applies
  }
}

/**
 * Strategy for TypeScript files.
 */
export class TypeScriptStrategy implements FileTypeStrategy {
  getName(): string {
    return 'typescript'
  }

  getFilePatterns(options: Options): string[] {
    return options.typescript
      ? ['**/*.{ts,tsx}']
      : []
  }

  shouldApply(options: Options): boolean {
    return options.typescript === true
  }
}

/**
 * Strategy for React/TSX/JSX component files.
 */
export class ReactStrategy implements FileTypeStrategy {
  getName(): string {
    return 'react'
  }

  getFilePatterns(options: Options): string[] {
    if (options.typescript) {
      return ['**/*.tsx', '**/components/**/*.{ts,tsx}']
    }
    return ['**/*.jsx', '**/components/**/*.{js,jsx}']
  }

  shouldApply(options: Options): boolean {
    return options.react === true || options.typescript === true
  }
}

/**
 * Strategy for Vue component files.
 */
export class VueStrategy implements FileTypeStrategy {
  getName(): string {
    return 'vue'
  }

  getFilePatterns(options: Options): string[] {
    return ['**/*.vue']
  }

  shouldApply(options: Options): boolean {
    return options.vue === true
  }
}

/**
 * Strategy for test files.
 */
export class TestStrategy implements FileTypeStrategy {
  getName(): string {
    return 'test'
  }

  getFilePatterns(options: Options): string[] {
    if (options.typescript) {
      return ['**/*.test.{ts,js}', '**/__tests__/**/*.{ts,js}']
    }
    return ['**/*.test.{js}', '**/__tests__/**/*.{js}']
  }

  shouldApply(options: Options): boolean {
    return true // Always applies
  }
}

/**
 * Strategy for all source files (JavaScript + TypeScript if enabled).
 */
export class AllFilesStrategy implements FileTypeStrategy {
  getName(): string {
    return 'all-files'
  }

  getFilePatterns(options: Options): string[] {
    return options.typescript
      ? ['**/*.{js,mjs,cjs,jsx,ts,tsx}']
      : ['**/*.{js,mjs,cjs,jsx}']
  }

  shouldApply(options: Options): boolean {
    return true // Always applies
  }
}

/**
 * Strategy for non-component source files (excludes TSX/JSX).
 */
export class SourceFilesStrategy implements FileTypeStrategy {
  getName(): string {
    return 'source-files'
  }

  getFilePatterns(options: Options): string[] {
    return options.typescript
      ? ['**/*.{js,mjs,cjs,ts}']
      : ['**/*.{js,mjs,cjs}']
  }

  shouldApply(options: Options): boolean {
    return true // Always applies
  }
}

/**
 * Strategy for component files (TSX/JSX only).
 */
export class ComponentFilesStrategy implements FileTypeStrategy {
  getName(): string {
    return 'component-files'
  }

  getFilePatterns(options: Options): string[] {
    return options.typescript
      ? ['**/*.tsx']
      : ['**/*.jsx']
  }

  shouldApply(options: Options): boolean {
    return true // Always applies (even if empty, it's valid)
  }
}

