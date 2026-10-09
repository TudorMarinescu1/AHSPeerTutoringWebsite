# Contributing

Thank you for helping with the Agoura High School Peer Tutoring website. This guide is the working agreement for our three-person team.

## Ground rules

- Do not commit or push directly to `main`.
- Use one branch and one pull request for each focused task.
- Do not approve your own pull request.
- At least one other team member must review the change.
- Tudor performs the final squash merge.
- Never force-push to `main` or rewrite shared history.
- Never commit private student information or credentials.

GitHub does not technically enforce these rules on our current private-repository plan. Each collaborator is responsible for following them.

## Start a change

Begin with an up-to-date copy of `main`:

```sh
git switch main
git pull origin main
git switch -c feature/short-description
```

Use a short, descriptive branch name. Recommended prefixes are:

- `feature/` for new pages or functionality
- `fix/` for defects
- `content/` for wording or information updates
- `style/` for visual-only changes

Examples include `feature/about-page`, `fix/mobile-navigation`, and `content/update-tutoring-hours`.

## Make and test the change

Keep the change focused on the task described by the branch. Before opening a pull request:

- Open the site and test the affected page.
- Check both a desktop-sized and phone-sized browser window.
- Confirm that links, buttons, and images work as intended.
- Check spelling and verify that tutoring information is accurate.
- Navigate using the keyboard and make sure interactive elements can be reached.
- Give informative images useful alternative text. Decorative images should use empty alternative text.
- Confirm that no passwords, tokens, student records, or private contact details were added.
- Review the diff and remove unrelated changes.

Commit and push the branch:

```sh
git add .
git commit -m "Describe the change briefly"
git push -u origin feature/short-description
```

Replace the example branch name with your actual branch.

## Step-by-step: open a pull request

Follow these steps after you have made and tested your change.

### 1. Confirm that you are not on `main`

In the repository folder, run:

```sh
git branch --show-current
```

The result should be your task branch, such as `feature/about-page`. If it says `main`, create a branch before committing:

```sh
git switch -c feature/short-description
```

### 2. Review and commit your work

See which files changed:

```sh
git status
git diff
```

Stage and commit the files when the changes look correct:

```sh
git add .
git commit -m "Describe the change briefly"
```

Use a short commit message that says what changed, such as `Add tutoring schedule section` or `Fix mobile header spacing`.

### 3. Push the branch to GitHub

Push the branch with:

```sh
git push -u origin HEAD
```

The `-u` option connects your local branch to its GitHub branch. After the first push, future updates only require `git push`.

### 4. Start the pull request on GitHub

1. Open [the repository on GitHub](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite).
2. GitHub will usually display a banner for the branch you just pushed. Select **Compare & pull request**.
3. If the banner is missing, select **Pull requests**, then **New pull request**.
4. Set **base** to `main` and **compare** to your task branch.
5. Check the commits and changed files shown below the branch selectors. Make sure only your intended changes appear.
6. Select **Create pull request** to open the PR form if it is not already open.

The direction should look like this:

```text
base: main  <-  compare: your-task-branch
```

### 5. Complete the pull request form

1. Give the PR a clear title, such as `Add About Us page`.
2. Complete every relevant section of the PR template:
   - Summarize the change.
   - Explain why it is needed.
   - Describe how you tested it.
   - Add screenshots for visible changes, or write `Not applicable`.
   - Check only the checklist items you actually completed.
3. In the right sidebar, select **Reviewers** and choose one of the other team members.
4. Leave **Allow edits by maintainers** enabled if GitHub displays that option.
5. Select **Create pull request**. Use **Create draft pull request** instead only when the work is intentionally unfinished and not ready for approval.

The pull request is now open. Do not merge it yourself; wait for a review and let Tudor perform the final squash merge.

### 6. Update the pull request after feedback

Make the requested edits on the same local branch. Then commit and push them:

```sh
git add .
git commit -m "Address pull request feedback"
git push
```

The existing pull request updates automatically. Do not open a second PR. Reply to the review comments and use the circular-arrow button beside the reviewer to request another review when the fixes are ready.

### If GitHub cannot create the PR

- If your branch is missing from the **compare** list, confirm that `git push -u origin HEAD` succeeded, then refresh GitHub.
- If GitHub says there is nothing to compare, confirm that you committed the change on your task branch rather than `main`.
- If unrelated files appear, stop and ask Tudor for help before creating or merging the PR.

## Review a pull request

Read the description first, then open **Files changed** and review every changed file. Mark files as **Viewed** as you finish them.

Check that:

- The change matches the stated purpose and does not include unrelated work.
- The site still loads without missing images or broken layout.
- The result works at desktop and mobile widths.
- Links and buttons behave as described.
- Website text and tutoring details are accurate.
- The HTML remains understandable and accessible.
- Colors, focus states, and text remain readable.
- No confidential data or credentials appear in the change.

Use line comments for specific feedback and GitHub suggestions when you know the exact replacement. Make comments clear about their importance:

- `Blocking:` must be fixed before merging.
- `Suggestion:` would improve the change but is not required.
- `Question:` asks for clarification before deciding.
- `Nit:` is a small optional cleanup.

When submitting the review:

- Choose **Comment** for questions or optional feedback when you are not yet approving.
- Choose **Request changes** when a blocking problem must be fixed.
- Choose **Approve** only after you have reviewed and tested the change and believe it is ready to merge.

After the author pushes fixes, review the new changes and submit a new approval if everything is ready.

## Respond to feedback

Reply to each review conversation so the reviewer knows what changed or why you disagree. Push fixes to the same branch; the pull request updates automatically. Re-request review when the blocking feedback has been addressed.

Do not resolve a blocking conversation until its concern has been addressed. When in doubt, ask the reviewer to confirm the fix.

## Merge and clean up

Tudor performs the final **Squash and merge** after the review is approved and all conversations are resolved. Delete the feature branch after the merge.

If you accidentally push directly to `main`, tell the team immediately. Do not force-push or try to rewrite the branch on your own.
