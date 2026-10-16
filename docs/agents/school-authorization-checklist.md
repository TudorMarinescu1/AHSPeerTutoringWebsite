# Proposed Student Sign-In Implementation

## Status

These are proposals for review; they are not approved or implemented. Mr. Klein, CTO of the district, has been notified of these proposals. Notification does not constitute approval.

## Proposed user flow

1. A student chooses **Continue with Google** and signs in with a district-managed account.
2. The site accepts only accounts from the district-approved student account group. The exact eligibility rule and how the district identifies student accounts still need approval.
3. On first sign-in, the site checks that Google reports the account email as verified before creating a site account.
4. If a verified sign-in matches an existing site account, connect the Google sign-in to that account rather than creating a duplicate. The account-linking behavior and any confirmation step need approval.
5. Require the student to verify the account again every 30 days. Until verification succeeds, block access to student-only features.

## Implementation ideas to evaluate

- Use Google sign-in (OAuth) configured for the district-managed student accounts, subject to district approval of the provider, configuration, and permissions.
- Store the account identifier and the minimum information needed to operate the tutoring service. Do not treat a successful Google sign-in as permission to collect unrelated student information.
- Keep sign-in state on the server, protect account-linking and verification flows, and provide a way to revoke a connection or disable an account.
- Show a clear message when an account is outside the approved scope or its verification has expired, with a safe path to try again or request help.
- Document what is stored, who can access it, how long it is retained, and who responds to account or data incidents before launch.

## Decisions needed before implementation

- Is district-managed Google sign-in an approved authentication provider for this site?
- What rule identifies eligible student accounts, and which accounts must be excluded?
- Is verification at account creation and every 30 days acceptable?
- May a verified matching sign-in be linked to an existing site account? Should the student confirm that link?
- What account data may be stored, who may access it, and how long may it be retained?
- Who owns the sign-in configuration and handles account recovery, revocation, and security incidents?
- Who gives final approval to implement and launch this flow?

Until these decisions are confirmed in writing, keep the flow at the proposal stage and do not enable student sign-in or collect student account data.
