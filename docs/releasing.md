# Releasing

This repo uses `release-it` for `@dauphaihau/eslint-config`.

## Command

```bash
pnpm release
```

Run it from the monorepo root. `release-it` executes inside `packages/eslint-config`.

During the release prompt, choose the correct semver bump:

- `patch` for fixes and small non-breaking changes
- `minor` for new non-breaking rules or features
- `major` for breaking changes

## What `pnpm release` does

The release flow automatically:

- runs `typecheck`, `test`, and `build`
- bumps the package version
- creates the release commit
- creates the git tag
- pushes the commit and tag

## Notes

- Commit all non-release changes before running `pnpm release`.
- Trusted publishing via `.github/workflows/publish.yml` is temporarily disabled because npm is rejecting OIDC publish attempts with `E404`.
- For now, publish `@dauphaihau/eslint-config` manually from `packages/eslint-config` after the release commit and tag are pushed.
- `prepublishOnly` still runs `pnpm build` as a final safety check during manual npm publish.
- If package contents change after a release is published, bump the version again instead of reusing the same version.

## Temporary Manual Publish

After `pnpm release` completes, publish manually from the package directory:

```bash
cd packages/eslint-config
npm publish --access public
```
