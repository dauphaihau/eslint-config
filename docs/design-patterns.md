# Design Patterns in @dauphaihau/eslint-config

This document provides a comprehensive overview of the design patterns implemented in the `@dauphaihau/eslint-config` package. These patterns enhance code maintainability, extensibility, and provide a clean API for users.

## Table of Contents

1. [Builder Pattern](#builder-pattern)
2. [Strategy Pattern](#strategy-pattern)
3. [Factory Pattern](#factory-pattern)
4. [Singleton Pattern](#singleton-pattern)

---

## Builder Pattern

### Overview

The **Builder Pattern** is used to construct complex ESLint configurations step-by-step using a fluent API. This pattern allows users to build configurations incrementally and provides flexibility in choosing which configs to include.

### Implementation

**Location:** `src/builder.ts`

The `ESLintConfigBuilder` class implements the Builder pattern:

```typescript
export class ESLintConfigBuilder {
  private configs: Config[] = []
  private options: Options = {}
  // ... state tracking flags

  setOptions(options: Options): this
  withBase(options?: Options): this
  withNaming(options?: Options): this
  withMaxLines(options?: Options): this
  withFileNames(options?: Options): this
  withTypeScript(options?: Options): this
  withCustom(config: Config | Config[]): this
  withAll(options?: Options): this
  build(): Config[]
  reset(): this
  // ... query methods
}
```

### Key Features

- **Fluent API**: Methods return `this` for method chaining
- **State Management**: Tracks which configs have been added
- **Option Merging**: Supports setting options globally or per-config
- **Validation**: Warns when TypeScript config is added without the option set
- **Reset Capability**: Can reset builder state for reuse

### Usage Examples

**Basic Usage:**
```typescript
import { createBuilder } from '@dauphaihau/eslint-config'

const config = createBuilder()
  .setOptions({ typescript: true })
  .withBase()
  .withNaming()
  .withMaxLines()
  .withFileNames()
  .withTypeScript()
  .build()
```

**Selective Configuration:**
```typescript
const config = createBuilder()
  .setOptions({ typescript: true })
  .withBase()
  .withNaming()
  // Skip maxLines and fileNames
  .withTypeScript()
  .build()
```

**Adding Custom Configs:**
```typescript
const config = createBuilder()
  .withAll()
  .withCustom({
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 'off',
    },
  })
  .build()
```

### Benefits

- ✅ **Flexibility**: Choose exactly which configs to include
- ✅ **Readability**: Fluent API makes configuration intent clear
- ✅ **Extensibility**: Easy to add new config types
- ✅ **Type Safety**: Full TypeScript support with proper types

---

## Strategy Pattern

### Overview

The **Strategy Pattern** is used to encapsulate file type-specific logic for determining file patterns. Each strategy knows how to handle a specific file type or framework, making it easy to extend support for new file types.

### Implementation

**Location:** `src/strategies/`

#### Strategy Interface

```typescript
export interface FileTypeStrategy {
  getFilePatterns(options: Options): string[]
  getName(): string
  shouldApply(options: Options): boolean
}
```

#### Concrete Strategies

The package implements the following strategies:

1. **JavaScriptStrategy** - Handles JavaScript files (`**/*.{js,mjs,cjs,jsx}`)
2. **TypeScriptStrategy** - Handles TypeScript files (`**/*.{ts,tsx}`)
3. **ReactStrategy** - Handles React/TSX/JSX component files
4. **VueStrategy** - Handles Vue component files (`**/*.vue`)
5. **TestStrategy** - Handles test files
6. **AllFilesStrategy** - Handles all source files
7. **SourceFilesStrategy** - Handles non-component source files
8. **ComponentFilesStrategy** - Handles component files (TSX/JSX only)

### Strategy Manager

**Location:** `src/strategies/strategy-manager.ts`

The `StrategyManager` class acts as the context for the Strategy pattern:

```typescript
export class StrategyManager {
  private strategies: Map<string, FileTypeStrategy> = new Map()

  register(strategy: FileTypeStrategy): void
  getStrategy(name: string): FileTypeStrategy | undefined
  getFilePatterns(strategyName: string, options: Options): string[]
  getActiveStrategies(options: Options): FileTypeStrategy[]

  // Convenience methods
  getAllFiles(options: Options): string[]
  getSourceFiles(options: Options): string[]
  getComponentFiles(options: Options): string[]
  getTypeScriptFiles(options: Options): string[]
  getReactFiles(options: Options): string[]
  getVueFiles(options: Options): string[]
  getTestFiles(options: Options): string[]
}
```

### Usage in Config Files

Config files use the strategy manager to get file patterns:

```typescript
// src/configs/naming.ts
import { strategyManager } from '../strategies'

export function namingConfig(options: Options = {}) {
  const allFiles = strategyManager.getSourceFiles(options)
  const tsxFiles = strategyManager.getComponentFiles(options)
  // ... use patterns in config
}
```

### Extending with Custom Strategies

Users can create and register custom strategies:

```typescript
import { FileTypeStrategy, strategyManager } from '@dauphaihau/eslint-config'

class SvelteStrategy implements FileTypeStrategy {
  getName() {
    return 'svelte'
  }

  getFilePatterns(options) {
    return ['**/*.svelte']
  }

  shouldApply(options) {
    return options.svelte === true
  }
}

// Register the custom strategy
strategyManager.register(new SvelteStrategy())

// Use it
const svelteFiles = strategyManager.getFilePatterns('svelte', { svelte: true })
```

### Benefits

- ✅ **Separation of Concerns**: File pattern logic isolated in strategies
- ✅ **Extensibility**: Easy to add new file types
- ✅ **Testability**: Strategies can be tested independently
- ✅ **Maintainability**: Centralized file pattern logic
- ✅ **Consistency**: All configs use the same strategy system

---

## Factory Pattern

### Overview

The **Factory Pattern** is used to create ESLint configurations through a simple factory function. This provides a convenient default way to create configs while hiding the complexity of the Builder pattern.

### Implementation

**Location:** `src/index.ts`

The default export function `dauphaihau()` acts as a factory:

```typescript
export default function dauphaihau(options: Options = {}) {
  return new ESLintConfigBuilder()
    .setOptions(options)
    .withAll()
    .build()
}
```

### Usage

**Simple Factory Usage:**
```typescript
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau({ typescript: true })
```

**Factory with Helper:**
```typescript
import { createBuilder } from '@dauphaihau/eslint-config'

// createBuilder() is also a factory function
export default createBuilder()
  .setOptions({ typescript: true })
  .withBase()
  .build()
```

### Benefits

- ✅ **Simplicity**: Easy-to-use default API
- ✅ **Convention over Configuration**: Sensible defaults
- ✅ **Flexibility**: Can still use Builder for advanced cases
- ✅ **Backward Compatibility**: Existing code continues to work

---

## Singleton Pattern

### Overview

The **Singleton Pattern** ensures that only one instance of the `StrategyManager` exists throughout the application lifecycle. This provides a centralized registry for all file type strategies.

### Implementation

**Location:** `src/strategies/strategy-manager.ts`

```typescript
export const strategyManager = new StrategyManager()
```

The `strategyManager` is exported as a singleton instance that:
- Is initialized once when the module is loaded
- Contains all registered strategies
- Provides a single point of access for strategy operations
- Can be extended by users registering custom strategies

### Usage

```typescript
import { strategyManager } from '@dauphaihau/eslint-config'

// All configs use the same singleton instance
const files = strategyManager.getAllFiles({ typescript: true })

// Custom strategies can be registered on the singleton
strategyManager.register(new CustomStrategy())
```

### Benefits

- ✅ **Single Source of Truth**: One instance manages all strategies
- ✅ **Global Access**: Available throughout the application
- ✅ **State Persistence**: Registered strategies persist across config builds
- ✅ **Resource Efficiency**: No need to create multiple manager instances

---

## Pattern Interactions

These design patterns work together to create a cohesive and extensible system:

1. **Factory** → **Builder**: The factory function uses the Builder pattern internally
2. **Builder** → **Strategy**: Config functions use the Strategy pattern to get file patterns
3. **Strategy** → **Singleton**: All strategies are managed by a singleton StrategyManager

### Architecture Flow

```
User Code
    ↓
Factory Function (dauphaihau)
    ↓
Builder (ESLintConfigBuilder)
    ↓
Config Functions (baseConfig, namingConfig, etc.)
    ↓
Strategy Manager (Singleton)
    ↓
Strategies (FileTypeStrategy implementations)
```

---

## Summary

The `@dauphaihau/eslint-config` package leverages multiple design patterns to provide:

- **Flexibility**: Builder pattern allows custom configuration assembly
- **Extensibility**: Strategy pattern enables easy addition of new file types
- **Simplicity**: Factory pattern provides easy-to-use defaults
- **Consistency**: Singleton pattern ensures unified strategy management

These patterns work together to create a maintainable, testable, and user-friendly ESLint configuration system.

---

## References

- **Builder Pattern**: [Gang of Four - Builder](https://refactoring.guru/design-patterns/builder)
- **Strategy Pattern**: [Gang of Four - Strategy](https://refactoring.guru/design-patterns/strategy)
- **Factory Pattern**: [Gang of Four - Factory Method](https://refactoring.guru/design-patterns/factory-method)
- **Singleton Pattern**: [Gang of Four - Singleton](https://refactoring.guru/design-patterns/singleton)

