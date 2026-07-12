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
- triggers GitHub Actions trusted publishing for npm

## Notes

- Commit all non-release changes before running `pnpm release`.
- npm publication now happens in `.github/workflows/publish.yml` after the release tag is pushed.
- npm trusted publishing must be configured in the npm package settings for this GitHub repository before CI can publish successfully.
- `prepublishOnly` still runs `pnpm build` as a final safety check during npm publish in CI.
- If package contents change after a release is published, bump the version again instead of reusing the same version.
