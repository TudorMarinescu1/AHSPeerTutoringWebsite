import assert from "node:assert/strict";
import test from "node:test";

import {
  getCoursesForSubject,
  getWeekDates,
  getSlotAvailability,
  sampleTutors
} from "../tutoring-data.js";

test("creates a Monday-through-Sunday week in school-local dates", () => {
  assert.deepEqual(getWeekDates("2026-10-14"), [
    "2026-10-12",
    "2026-10-13",
    "2026-10-14",
    "2026-10-15",
    "2026-10-16",
    "2026-10-17",
    "2026-10-18"
  ]);
});

test("keeps Other available in every subject's course list", () => {
  assert.ok(getCoursesForSubject("algebra").includes("Other / not listed"));
});

test("marks a slot open only when a qualified tutor remains available", () => {
  const open = getSlotAvailability({ date: "2026-10-12", time: "15:30", subjectId: "algebra" });
  const full = getSlotAvailability({ date: "2026-10-14", time: "15:30", subjectId: "biology" });

  assert.equal(open.isOpen, true);
  assert.ok(open.tutors.length > 0);
  assert.equal(full.isOpen, false);
  assert.deepEqual(full.tutors, []);
});

test("exposes editable tutor sample data", () => {
  assert.ok(sampleTutors.some((tutor) => tutor.subjectIds.includes("algebra")));
});
