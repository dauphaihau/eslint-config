# @dauphaihau/eslint-config

- Auto fix for formatting (aimed to be used standalone without Prettier)
- Opinionated, but very customizable
- Optional TypeScript support
- ESLint Flat config, compose easily!

## Installation

```bash
npm i -D @dauphaihau/eslint-config
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.mjs
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau()
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
Normally you only need to import the dauphaihau preset:

```js
// eslint.config.js
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau()
```

### Customize

```js
// eslint.config.js
import dauphaihau from '@dauphaihau/eslint-config'

export default dauphaihau({
  typescript: true,
})

```
## License

MIT

