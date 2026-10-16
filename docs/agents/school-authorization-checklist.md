# School Authorization Checklist and Proposed Student Sign-In

## Status

The sign-in proposals below are not approved or implemented. Mr. Klein, CTO of the district, has been notified of these proposals; notification does not constitute approval. Resolve the applicable authorization questions and record decisions in writing before launch or before enabling student-only features.

## Authorization and ownership

1. May this website operate as a school-sponsored project, and what description or disclaimer should it use?
2. Who is the staff sponsor, and who gives final approval before launch?
3. Who will own the domain, hosting account, source code, forms, and administrator access after the site maintainer graduates or leaves?
4. What changes or new features require approval after launch?

## School identity and public content

5. May the site use the school or district name, logo, mascot, colors, and official photos?
6. May the website list student tutors, staff members, or administrators by name?
7. May it use student or staff photos, videos, quotes, or testimonials, and what permission is required?
8. Should any part of the site be public, or should some information require a school account to view?

## Student data and tutoring safeguards

9. Which details may the site collect in tutoring requests?
10. What information must never be collected or displayed?
11. Where will form submissions be stored, who can see them, and how long should they be kept?
12. Does the school require a privacy notice, parent consent, policy review, or approved vendor list?
13. How may tutors and students communicate?
14. May tutors and students contact each other directly, and what supervision or records are required?
15. What is required before someone can be listed as a tutor?
16. Who handles a missed session, inappropriate message, complaint, safety concern, or academic-honesty issue?
17. What should the site say about tutoring boundaries and academic honesty?

## Technology, accessibility, and launch

18. Are the hosting provider and connected services approved?
19. What security measures are required?
20. Who handles a data exposure, hacked account, or inappropriate form submission?
21. What accessibility requirements must the site meet?
22. Who may publish, edit, or remove site content?
23. May the site use third-party images, videos, links, social media, advertising, donations, or paid tutoring?
24. Can we start with a private pilot, and what must be tested before wider launch?
25. Can the final approval, staff owner, permitted data, approved tools, and launch conditions be confirmed in writing?

## Proposed student sign-in flow

1. A student chooses **Continue with Google** and signs in with a district-managed account.
2. The site accepts only accounts from the district-approved student account group. The eligibility rule and how the district identifies student accounts still need approval.
3. On first sign-in, the site checks that Google reports the account email as verified before creating a site account.
4. If a verified sign-in matches an existing site account, connect the Google sign-in to that account rather than creating a duplicate. The account-linking behavior and any confirmation step need approval.
5. Require the student to verify the account again every 30 days. Until verification succeeds, block access to student-only features.

## Implementation ideas to evaluate

- Use Google sign-in (OAuth) configured for the district-managed student accounts, subject to district approval of the provider, configuration, and permissions.
- Store the account identifier and the minimum information needed to operate the tutoring service. Do not treat a successful Google sign-in as permission to collect unrelated student information.
- Keep sign-in state on the server, protect account-linking and verification flows, and provide a way to revoke a connection or disable an account.
- Show a clear message when an account is outside the approved scope or its verification has expired, with a safe path to try again or request help.
- Document what is stored, who can access it, how long it is retained, and who responds to account or data incidents before launch.

## Sign-in decisions needed before implementation

- Is district-managed Google sign-in an approved authentication provider for this site?
- What rule identifies eligible student accounts, and which accounts must be excluded?
- Is verification at account creation and every 30 days acceptable?
- May a verified matching sign-in be linked to an existing site account? Should the student confirm that link?
- What account data may be stored, who may access it, and how long may it be retained?
- Who owns the sign-in configuration and handles account recovery, revocation, and security incidents?
- Who gives final approval to implement and launch this flow?

> Could you please confirm the approved purpose, staff owner, permitted data, approved tools, required permissions, and publication process in writing?
