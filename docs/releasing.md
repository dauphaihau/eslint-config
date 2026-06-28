# Releasing

Each package that has changes must be released independently by following the steps below in order.

## Packages

| Package | Path |
|---|---|
| `@dauphaihau/eslint-config` | `packages/eslint-config` |

## Working directory

Use the correct working directory for each command group:

- Monorepo root:
  - repo-wide lint, test, and build commands
- Package directory (`packages/eslint-config`):
  - version bump, release commit, tag push, and publish commands

## Steps

Before bumping the version, commit all non-release changes for the package.
The version bump should happen only when you are ready to release, and it should be a dedicated release commit.

**1. Bump version and build**
```bash
cd packages/eslint-config
pnpm version:patch   # bug fixes, minor tweaks
pnpm version:minor   # new rules or features, non-breaking
pnpm version:major   # breaking changes
```

**2. Commit the version bump**
```bash
git add package.json
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

## Notes

- Run the release steps above from `packages/eslint-config`, not from the monorepo root.
- Use `pnpm ship`, not `pnpm publish`, so pnpm runs the package script instead of pnpm's built-in publish command.
- `pnpm ship` triggers `prepublishOnly` which rebuilds before publishing. This is expected.
- If package contents change after a release tag is pushed, bump the version again instead of reusing the same version.
