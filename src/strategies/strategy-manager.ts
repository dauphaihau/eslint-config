import type { Options } from '../index';
import {
  type FileTypeStrategy,
  JavaScriptStrategy,
  TypeScriptStrategy,
  ReactStrategy,
  VueStrategy,
  TestStrategy,
  AllFilesStrategy,
  SourceFilesStrategy,
  ComponentFilesStrategy
} from './file-type-strategy';

/**
 * Manages file type strategies and provides convenient access to file patterns.
 * Acts as a context for the Strategy pattern.
 */
export class StrategyManager {
  private strategies: Map<string, FileTypeStrategy> = new Map();

  constructor() {
    // Register all available strategies
    this.register(new JavaScriptStrategy());
    this.register(new TypeScriptStrategy());
    this.register(new ReactStrategy());
    this.register(new VueStrategy());
    this.register(new TestStrategy());
    this.register(new AllFilesStrategy());
    this.register(new SourceFilesStrategy());
    this.register(new ComponentFilesStrategy());
  }

  /**
   * Register a new strategy.
   */
  register(strategy: FileTypeStrategy): void {
    this.strategies.set(strategy.getName(), strategy);
  }

  /**
   * Get a strategy by name.
   */
  getStrategy(name: string): FileTypeStrategy | undefined {
    return this.strategies.get(name);
  }

  /**
   * Get file patterns for a specific strategy.
   */
  getFilePatterns(strategyName: string, options: Options): string[] {
    const strategy = this.getStrategy(strategyName);
    if (!strategy || !strategy.shouldApply(options)) {
      return [];
    }
    return strategy.getFilePatterns(options);
  }

  /**
   * Get all active strategies based on options.
   */
  getActiveStrategies(options: Options): FileTypeStrategy[] {
    return Array.from(this.strategies.values()).filter(strategy =>
      strategy.shouldApply(options)
    );
  }

  /**
   * Convenience method: Get all file patterns.
   */
  getAllFiles(options: Options): string[] {
    return this.getFilePatterns('all-files', options);
  }

  /**
   * Convenience method: Get source file patterns (excluding components).
   */
  getSourceFiles(options: Options): string[] {
    return this.getFilePatterns('source-files', options);
  }

  /**
   * Convenience method: Get component file patterns (TSX/JSX).
   */
  getComponentFiles(options: Options): string[] {
    return this.getFilePatterns('component-files', options);
  }

  /**
   * Convenience method: Get TypeScript file patterns.
   */
  getTypeScriptFiles(options: Options): string[] {
    return this.getFilePatterns('typescript', options);
  }

  /**
   * Convenience method: Get React file patterns.
   */
  getReactFiles(options: Options): string[] {
    return this.getFilePatterns('react', options);
  }

  /**
   * Convenience method: Get Vue file patterns.
   */
  getVueFiles(options: Options): string[] {
    return this.getFilePatterns('vue', options);
  }

  /**
   * Convenience method: Get test file patterns.
   */
  getTestFiles(options: Options): string[] {
    return this.getFilePatterns('test', options);
  }
}

/**
 * Singleton instance of the strategy manager.
 * Can be used directly or extended for custom strategies.
 */
export const strategyManager = new StrategyManager();
