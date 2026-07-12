# Releasing

This repo uses `release-it` for `@dauphaihau/eslint-config`.

## Command

```bash
pnpm release
```

Run it from the monorepo root. `release-it` executes inside `packages/eslint-config`.

## Release Flow

1. Make your code changes.
2. Commit and push your normal work to `main`.
3. Run `pnpm release` from the repo root.
4. `release-it` will:
   - run `typecheck`, `test`, and `build`
   - bump the package version
   - create the release commit
   - create the git tag
   - push the release commit and tag
5. GitHub Actions publishes the package to npm from the pushed `v*` tag via trusted publishing.

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
- lets GitHub Actions publish the package from the pushed tag

## Notes

- Commit all non-release changes before running `pnpm release`.
- Do not mix normal code changes into the release commit. Let `release-it` create the version bump commit separately.
- Trusted publishing is handled by [publish.yml](/Volumes/Local/dev/pj-personal/dev-tools/eslint-config/.github/workflows/publish.yml) when a `v*` tag is pushed.
- Configure the npm package trusted publisher to match this repository and workflow filename exactly.
- `npm publish` is not run locally. CI publishes after the release commit and tag are pushed.
- `prepublishOnly` still runs `pnpm build` as a final safety check before npm publish in CI.
- If package contents change after a release is published, bump the version again instead of reusing the same version.
