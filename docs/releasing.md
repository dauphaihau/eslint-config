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

**2. Commit the version bump**
```bash
git add packages/eslint-config/package.json
git commit -m "chore(release): bump eslint-config to <version>"
```

**3. Tag the release**
```bash
git tag -a v<version> -m "v<version>"
```

**4. Push commits and tags**
```bash
pnpm push:tags
```

**5. Publish to npm**
```bash
pnpm ship
```

> All commands should be run from the **root** of the monorepo.
> Use `pnpm ship`, not `pnpm publish`, so pnpm runs the repo script instead of pnpm's built-in publish command.
> `pnpm ship` triggers `prepublishOnly` which rebuilds before publishing — this is expected.
