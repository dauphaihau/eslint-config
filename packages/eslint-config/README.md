# @dauphaihau/eslint-config

- Auto fix for formatting (aimed to be used standalone without Prettier)
- Opinionated, but very customizable
- Optional TypeScript support
- ESLint Flat config, compose easily!

## Installation

### Basic (TypeScript / JS only)

```bash
npm i -D @dauphaihau/eslint-config
```

### React projects

React plugins are optional peer dependencies — install them alongside the config:

```bash
# npm
npm i -D @dauphaihau/eslint-config eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh

# pnpm
pnpm add -D @dauphaihau/eslint-config eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh

# yarn
yarn add -D @dauphaihau/eslint-config eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Add lint scripts

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Usage

Create `eslint.config.mjs` in your project root.

### Auto-detection

React and TypeScript are auto-detected from your `package.json` / `tsconfig.json` — no config needed in most cases:

```js
// eslint.config.mjs
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau()
```

### Explicit options

```js
// eslint.config.mjs
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau({
  typescript: true,
  react: true,
})
```

## License

MIT

