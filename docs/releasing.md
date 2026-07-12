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
- lets GitHub Actions publish the package from the pushed tag

## Notes

- Commit all non-release changes before running `pnpm release`.
- Trusted publishing is handled by [publish.yml](/Volumes/Local/dev/pj-personal/dev-tools/eslint-config/.github/workflows/publish.yml) when a `v*` tag is pushed.
- Configure the npm package trusted publisher to match this repository and workflow filename exactly.
- `prepublishOnly` still runs `pnpm build` as a final safety check before npm publish in CI.
- If package contents change after a release is published, bump the version again instead of reusing the same version.
