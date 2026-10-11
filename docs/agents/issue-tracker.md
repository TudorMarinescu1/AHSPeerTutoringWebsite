# Issue tracker: GitHub

Issues and specs for this repository live as GitHub issues. Use the `gh` CLI for issue operations.

## Conventions

- Create issues with `gh issue create`.
- Read issues with `gh issue view`.
- List issues with `gh issue list`.
- Comment with `gh issue comment`.
- Apply labels with `gh issue edit`.
- Close issues with `gh issue close`.

Infer the repository from `git remote -v`; the GitHub CLI does this automatically when run inside this clone.

## Pull requests as a triage surface

PRs as a request surface: **no**.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read the GitHub issue with `gh issue view`.
