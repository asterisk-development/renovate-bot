# renovate-bot

Scheduled [Renovate](https://docs.renovatebot.com/) runner for repositories under `asterisk-development/*`.

A GitHub Actions workflow authenticates as a GitHub App, then runs Renovate with autodiscovery. Renovate opens dependency update pull requests on matching repositories and writes an onboarding config into repos that do not have one yet.

## Schedule

The workflow in [`.github/workflows/renovate.yaml`](.github/workflows/renovate.yaml) runs daily at 03:30 UTC, and can also be started manually with **workflow_dispatch**.

Runs share a `renovate` concurrency group so a scheduled run does not cancel one already in progress.

## Configuration

[`config.js`](config.js) is the configuration Renovate loads (`configurationFile: config.js`):

| Setting | Value |
| --- | --- |
| Platform | GitHub |
| Autodiscover | Repositories matching `asterisk-development/*` |
| Onboarding | Enabled |
| Dependency dashboard | Disabled |
| Notifications | `configErrorIssue` is suppressed |

New repositories receive the onboarding preset in `onboardingConfig`:

- Extends `config:recommended`
- Ignores releases younger than 3 days (`minimumReleaseAge`)
- Automerge for `minor` and `patch` updates
- Major updates stay as pull requests for review

[`renovate.json`](renovate.json) holds the same update policy (`config:recommended`, 3-day release age, automerge for minor and patch). It is the Renovate config for this repository itself.

## Required secrets

The workflow mints a token with [`actions/create-github-app-token`](https://github.com/actions/create-github-app-token). The GitHub App must be installed on this repository and on the `asterisk-development` repositories Renovate should update, with permission to read contents and open pull requests.

| Secret | Purpose |
| --- | --- |
| `APP_ID` | GitHub App ID |
| `APP_PRIVATE_KEY` | GitHub App private key (PEM) |

## Run it

Push to the default branch so the workflow is available, then either wait for the cron or run **Renovate** from the Actions tab.

Renovate will:

1. Discover repositories matching `asterisk-development/*`.
2. Open an onboarding pull request on repos that have no Renovate config.
3. Open (and, for minor and patch updates, automerge) dependency update pull requests.
