# dauphaihau-eslint-config-monorepo

Monorepo for the `@dauphaihau/eslint-config` package and its local playgrounds.

## Packages

| Package | Path | Purpose |
|---|---|---|
| `@dauphaihau/eslint-config` | `packages/eslint-config` | Published ESLint flat config package |

## Repo Structure

```text
packages/eslint-config  Published package source
playground/js           JS example project
playground/ts           TS example project
playground/react        React example project
playground/tailwind     Tailwind example project
docs/                   Supporting repo docs
```

## Development

Install dependencies from the repo root:

```bash
pnpm install
```

Useful commands:

```bash
pnpm build
pnpm test
pnpm lint:js
pnpm lint:ts
pnpm lint:react
pnpm lint:tailwind
pnpm fix:js
pnpm fix:ts
pnpm fix:react
pnpm fix:tailwind
```

## Package Usage

Consumer-facing installation and usage docs live in:

- [`packages/eslint-config/README.md`](packages/eslint-config/README.md)

## Release

Release steps are documented in:

- [`docs/releasing.md`](docs/releasing.md)
