import assert from "node:assert/strict";
import test from "node:test";

import { createTutoringService } from "../tutoring-service.js";

test("requires device approval before a first booking and keeps the slot open", () => {
  const service = createTutoringService();
  const draft = { tutorId: "maya-chen", date: "2026-10-12", time: "15:30", student: { name: "Ari", email: "ari@example.test", course: "Algebra 2" } };
  assert.equal(service.requestBooking(draft).status, "needs-verification");
  assert.equal(service.isTutorBookable(draft), true);
  assert.equal(service.approveAndBook(draft).status, "confirmed");
  assert.equal(service.isTutorBookable(draft), false);
});

test("records sample notifications without delivering real email", () => {
  const service = createTutoringService();
  const draft = { tutorId: "maya-chen", date: "2026-10-12", time: "15:30", student: { name: "Ari", email: "ari@example.test", course: "Algebra 2" } };
  service.approveAndBook(draft);
  assert.deepEqual(service.notifications.map((item) => item.kind), ["student-confirmation", "tutor-booked", "student-reminder", "tutor-reminder"]);
});

test("enforces the 48-hour tutor slot removal policy", () => {
  const service = createTutoringService({ now: "2026-10-10T12:00:00Z" });
  assert.equal(service.canTutorRemoveSlot("2026-10-13T15:30:00Z", false), true);
  assert.equal(service.canTutorRemoveSlot("2026-10-11T15:30:00Z", false), false);
  assert.equal(service.canTutorRemoveSlot("2026-10-13T15:30:00Z", true), false);
});
