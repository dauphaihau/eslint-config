# @dauphaihau/eslint-config

- Auto fix for formatting (aimed to be used standalone without Prettier)
- Opinionated, but very customizable
- Auto-detects your tech stack (React, TypeScript, Tailwind, etc.)
- ESLint Flat config, compose easily!

## Installation

```bash
npm i -D @dauphaihau/eslint-config
```

If your project uses React, install the React ESLint plugins as well:

```bash
npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

If your project uses Tailwind CSS, install the Tailwind ESLint plugin as well:

```bash
npm i -D eslint-plugin-tailwindcss
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import dauphaihauConfig from '@dauphaihau/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...(await dauphaihauConfig())
])
```

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Usage

### Basic
Normally you only need to import the dauphaihauConfig preset:

```js
// eslint.config.js
import dauphaihauConfig from '@dauphaihau/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...(await dauphaihauConfig())
])
```

### Customize

The config auto-detects your tech stack. Pass `false` to explicitly disable rules for a specific stack:

```js
// eslint.config.js
import dauphaihauConfig from '@dauphaihau/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...(await dauphaihauConfig({
    tailwind: false, // disable Tailwind rules
  })),

  // Your configs and overrides
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
])
```
## License

MIT
