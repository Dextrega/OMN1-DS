# Releasing

Versioning uses [Changesets](https://github.com/changesets/changesets). The five packages are _linked_ (they bump together).

```bash
pnpm changeset            # describe the change, pick the bump
pnpm version-packages     # apply bumps + changelogs
```

## Open decision: where to publish

Not decided yet, so **nothing publishes automatically** (no release workflow, no `publishConfig`). Options:

| Option                                       | Needs                                                                                                                                                           | Notes                                               |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **npm, private `@omn1/*`**                   | an npm organisation named `omn1` (paid plan for private packages)                                                                                               | keeps the `@omn1` scope as designed                 |
| **GitHub Packages**                          | the npm scope must equal the GitHub owner. The repo lives under `Dextrega`, so packages would be `@dextrega/*` — or the repo moves to a GitHub org named `omn1` | no extra vendor; consumers need a token in `.npmrc` |
| **No registry (git dependency / workspace)** | nothing                                                                                                                                                         | fine while only studio projects consume the DS      |

Once chosen: add `publishConfig`, a `release.yml` using `changesets/action`, and an `NPM_TOKEN` / `GITHUB_TOKEN` secret.
