import { sampleAvailability } from "./tutoring-data.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function createTutoringService({ now = () => new Date().toISOString() } = {}) {
  const bookings = [];
  const notifications = [];
  let verifiedUntil = 0;

  function nowMs() {
    return new Date(typeof now === "function" ? now() : now).getTime();
  }

  function isTutorBookable({ tutorId, date, time }) {
    return sampleAvailability.some((slot) => slot.tutorId === tutorId && slot.date === date && slot.time === time && slot.available)
      && !bookings.some((booking) => booking.tutorId === tutorId && booking.date === date && booking.time === time && booking.status === "confirmed");
  }

  function requestBooking(draft) {
    if (!isTutorBookable(draft)) return { status: "conflict" };
    if (nowMs() > verifiedUntil) return { status: "needs-verification" };
    return confirm(draft);
  }

  function confirm(draft) {
    if (!isTutorBookable(draft)) return { status: "conflict" };
    const booking = { id: `sample-${bookings.length + 1}`, ...draft, status: "confirmed" };
    bookings.push(booking);
    notifications.push(
      { kind: "student-confirmation", bookingId: booking.id },
      { kind: "tutor-booked", bookingId: booking.id },
      { kind: "student-reminder", bookingId: booking.id, leadHours: 24 },
      { kind: "tutor-reminder", bookingId: booking.id, leadHours: 24 }
    );
    return { status: "confirmed", booking };
  }

  function approveAndBook(draft) {
    verifiedUntil = nowMs() + THIRTY_DAYS_MS;
    return confirm(draft);
  }

  function canTutorRemoveSlot(slotTime, hasBooking) {
    return !hasBooking && new Date(slotTime).getTime() - nowMs() >= 48 * 60 * 60 * 1000;
  }

  function submitSchedule(tutorId, weekStart) {
    notifications.push({ kind: "schedule-submitted", tutorId, weekStart });
    return { status: "submitted" };
  }

  function requestSundayReminder(tutorId) {
    notifications.push({ kind: "sunday-schedule-reminder", tutorId });
  }

  return { bookings, notifications, isTutorBookable, requestBooking, approveAndBook, canTutorRemoveSlot, submitSchedule, requestSundayReminder };
}
