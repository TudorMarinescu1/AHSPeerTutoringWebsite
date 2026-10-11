export const SCHOOL_TIME_ZONE = "America/Los_Angeles";
export const PHOTO_POLICY = { showTutorPhotos: false };

export const subjects = [
  { id: "all", name: "All subjects" },
  { id: "algebra", name: "Algebra" },
  { id: "biology", name: "Biology" },
  { id: "chemistry", name: "Chemistry" },
  { id: "english", name: "English" },
  { id: "world-history", name: "World History" }
];

export const coursesBySubject = {
  algebra: ["Algebra 1", "Algebra 2", "Geometry", "Precalculus"],
  biology: ["Biology", "AP Biology"],
  chemistry: ["Chemistry", "AP Chemistry"],
  english: ["English 9", "English 10", "English 11", "English 12", "AP English"],
  "world-history": ["World History", "AP World History"]
};

export const sampleTutors = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    initials: "MC",
    photo: "",
    subjectIds: ["algebra", "chemistry"],
    expertise: "Equation strategy, stoichiometry, and test review",
    bio: "Maya is a junior who enjoys breaking multi-step problems into calm, repeatable steps."
  },
  {
    id: "david-ortiz",
    name: "David Ortiz",
    initials: "DO",
    photo: "",
    subjectIds: ["algebra", "biology"],
    expertise: "Function review, lab reports, and study plans",
    bio: "David focuses on helping students build confidence before quizzes and labs."
  },
  {
    id: "lena-patel",
    name: "Lena Patel",
    initials: "LP",
    photo: "",
    subjectIds: ["biology", "chemistry"],
    expertise: "Cell systems, chemical reactions, and diagrams",
    bio: "Lena uses visual explanations and active recall to make science units stick."
  },
  {
    id: "noah-williams",
    name: "Noah Williams",
    initials: "NW",
    photo: "",
    subjectIds: ["english", "world-history"],
    expertise: "Essay planning, source analysis, and revision",
    bio: "Noah helps students turn rough ideas into clear outlines and stronger arguments."
  }
];

export const sampleAvailability = [
  { date: "2026-10-12", time: "15:30", tutorId: "maya-chen", available: true },
  { date: "2026-10-12", time: "15:30", tutorId: "david-ortiz", available: true },
  { date: "2026-10-12", time: "16:15", tutorId: "noah-williams", available: true },
  { date: "2026-10-13", time: "07:30", tutorId: "david-ortiz", available: true },
  { date: "2026-10-13", time: "15:30", tutorId: "lena-patel", available: true },
  { date: "2026-10-13", time: "16:15", tutorId: "maya-chen", available: false },
  { date: "2026-10-14", time: "15:30", tutorId: "lena-patel", available: false },
  { date: "2026-10-14", time: "16:15", tutorId: "noah-williams", available: true },
  { date: "2026-10-15", time: "07:30", tutorId: "maya-chen", available: true },
  { date: "2026-10-15", time: "15:30", tutorId: "david-ortiz", available: true },
  { date: "2026-10-16", time: "15:30", tutorId: "noah-williams", available: true },
  { date: "2026-10-19", time: "15:30", tutorId: "maya-chen", available: true },
  { date: "2026-10-20", time: "16:15", tutorId: "lena-patel", available: true },
  { date: "2026-10-21", time: "15:30", tutorId: "noah-williams", available: true },
  { date: "2026-10-22", time: "07:30", tutorId: "david-ortiz", available: true },
  { date: "2026-10-23", time: "15:30", tutorId: "lena-patel", available: true }
];

export const timeRows = ["07:30", "15:30", "16:15"];

function toUtcDate(dateKey) {
  return new Date(`${dateKey}T12:00:00Z`);
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

export function getWeekDates(dateKey) {
  const date = toUtcDate(dateKey);
  const mondayOffset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(date);
    next.setUTCDate(date.getUTCDate() + index);
    return toDateKey(next);
  });
}

export function addWeeks(dateKey, numberOfWeeks) {
  const date = toUtcDate(dateKey);
  date.setUTCDate(date.getUTCDate() + numberOfWeeks * 7);
  return toDateKey(date);
}

export function getCoursesForSubject(subjectId) {
  return [...(coursesBySubject[subjectId] || []), "Other / not listed"];
}

export function getTutor(tutorId) {
  return sampleTutors.find((tutor) => tutor.id === tutorId);
}

export function getSlotAvailability({ date, time, subjectId = "all" }) {
  const tutors = sampleAvailability
    .filter((slot) => slot.date === date && slot.time === time && slot.available)
    .map((slot) => getTutor(slot.tutorId))
    .filter(Boolean)
    .filter((tutor) => subjectId === "all" || tutor.subjectIds.includes(subjectId));

  return { isOpen: tutors.length > 0, tutors };
}

export function formatTime(time) {
  const [hourText, minute] = time.split(":");
  const hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

export function formatDate(dateKey, options) {
  return new Intl.DateTimeFormat("en-US", { timeZone: SCHOOL_TIME_ZONE, ...options })
    .format(toUtcDate(dateKey));
}
