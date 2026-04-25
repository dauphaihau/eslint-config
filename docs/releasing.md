# Releasing

Each package that has changes must be released independently by following the steps below in order.

## Packages

| Package | Path |
|---|---|
| `@dauphaihau/eslint-config` | `packages/eslint-config` |

## Steps

Before bumping the version, commit all non-release changes for the package.
The version bump should happen only when you are ready to release, and it should be a dedicated release commit.

**1. Bump version and build**
```bash
pnpm version:patch   # bug fixes, minor tweaks
pnpm version:minor   # new rules or features, non-breaking
pnpm version:major   # breaking changes
```

**2. Push commits and tags**
```bash
pnpm push
```

**3. Publish to npm**
```bash
pnpm publish
```

> All commands should be run from the **root** of the monorepo.
