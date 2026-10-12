# Website Implementation History

This document summarizes the website features requested in GitHub Issues and the implementations recorded in pull requests. It is a project history, not school authorization: a closed issue or merged pull request does not mean the school approved a feature for real student use.

Update this document when an implementation is merged or deliberately deferred. Link the relevant issue and pull request, and record the shipped scope separately from deferred work and unresolved school decisions.

## Current implementation

The current tutoring experience is a frontend prototype using editable sample data and local adapters. The merged implementation does not connect to a production database or email provider and does not represent approval to collect or use real student data.

The formal calendar and booking prototype was merged in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15), addressing the parent [Issue #7](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/7) and most of its child issues.

## Implemented history

| Request | What was requested | Recorded implementation |
| --- | --- | --- |
| [Issue #1: Complete the home page](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/1) | Explain tutoring location, schedule, eligibility, cost, process, walk-ins, and announcements; connect navigation and calls to action; preserve the existing visual design. | [PR #5](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/5) merged the Home page content and links. It uses the schedule already present in the project and leaves exact morning hours, fee, and announcements unpublished because they were unconfirmed. |
| [Issue #2: Build the About Us page](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/2) | Add mission, program, board, and approved contact information in a responsive About page. | [PR #4](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/4) merged the page and navigation. Student names, roles, photos, social handles, and private contact details were omitted unless approved content was supplied. |
| [Issue #3: Build the tutoring-finder prototype](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/3) | Let visitors explore fictional sample in-person availability without personal data or real bookings. | [PR #6](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/6) was closed without merging. Its sample-only finder scope was superseded by the formal calendar in PR #15; do not count PR #6 as shipped to the default branch. |
| [Issue #8: Weekly tutoring calendar](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/8) | Replace the static finder with an editable-data weekly calendar, school-local times, subject/course filters, availability status, and a phone-friendly day view. | Implemented in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15): sample-data model, week navigation, local-time calculation, filters, availability rules, responsive calendar. |
| [Issue #9: Shared tutoring navigation](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/9) | Connect Home, About, and Tutoring with Book Tutoring, My Bookings, and a blank How to Become a Tutor destination. | Implemented in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15): shared navigation group and blank placeholder destination. |
| [Issue #10: Tutor selection and profiles](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/10) | Show qualified tutors for an available slot, with profile details and photo/initials fallback. | Implemented in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15): selecting an open time shows qualified tutor choices and profile details. Real photos and identities still require approval. |
| [Issue #11: Booking and My Bookings prototype](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/11) | Model one student per tutor-timeslot, booking conflicts, browser-visible bookings, and cancellation/rescheduling rules. | Implemented in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15) with browser-local prototype behavior and sample data. This is not a production booking service. |
| [Issue #13: Verification and notification adapters](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/13) | Model first-device email approval, 30-day expiry, booking notifications, and reminders without real email or real student data. | Implemented in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15) as local, inspectable requests. No email provider is contacted. |
| [Issue #14: Cross-device prototype verification](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/14) | Check the connected experience, accessibility, and responsive calendar behavior. | Marked complete for the prototype in [PR #15](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/pull/15): seven automated sample-domain tests, rendered Home inspection, text plus color availability, and responsive styles. Browser end-to-end coverage remains a production-readiness follow-up before real student data is used. |

## Deliberately deferred

[Issue #12: Tutor schedule management and exception rules](https://github.com/TudorMarinescu1/AHSPeerTutoringWebsite/issues/12) requested tutor schedule submission and administrator handling. Its discussion says the schedule-management UI was removed from this release and deferred to a later signed-in tutor experience. The service-level 48-hour rule remains represented in sample domain tests; a tutor/admin interface is not part of the shipped prototype.

## Design decisions recorded in issues

The parent issue records these prototype behaviors: Sunday submission/reminder for the following week's availability; one student per tutor-timeslot; a 48-hour tutor cancellation restriction for unbooked slots; a 24-hour student cancellation/rescheduling cutoff; and browser-specific verification that expires after 30 days. These are product decisions in the issue history, not confirmed school policies.

## School approval remains unresolved

The implementation issues do not establish who owns or sponsors the site, which school identity assets or student details may be published, which data may be collected, which vendors are approved, or who handles safeguarding and incidents. Do not treat prototype requirements as permission to launch those features with real people or information. Track the approval questions in [School Website Authorization Check In](agents/school-authorization-checklist.md) and record written school decisions there before relying on them.

## Future entry template

For each future implementation, add a row under Implemented history with:

- GitHub issue and pull request links.
- The requested behavior in concise terms.
- What actually merged and its commit or PR reference.
- Any scope removed, deferred, or still awaiting school approval.
