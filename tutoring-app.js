import {
  addWeeks,
  formatDate,
  formatTime,
  getCoursesForSubject,
  getSlotAvailability,
  getWeekDates,
  PHOTO_POLICY,
  subjects,
  timeRows
} from "./tutoring-data.js";
import { createTutoringService } from "./tutoring-service.js";

const state = { weekAnchor: "2026-10-12", subjectId: "all", mobileDayIndex: 0 };
const calendar = document.querySelector("#calendar");
const subjectSelect = document.querySelector("#subject-select");
const courseSelect = document.querySelector("#course-select");
const weekRange = document.querySelector("#week-range");
const mobileDayControls = document.querySelector("#mobile-day-controls");
const tutorDialog = document.querySelector("#tutor-dialog");
const tutorDialogContent = document.querySelector("#tutor-dialog-content");
const service = createTutoringService();
let selectedSlot = null;

function dateLabel(dateKey) {
  return formatDate(dateKey, { weekday: "short", month: "short", day: "numeric" });
}

function formatWeekRange(dates) {
  const start = formatDate(dates[0], { month: "long", day: "numeric" });
  const end = formatDate(dates.at(-1), { month: "long", day: "numeric", year: "numeric" });
  return `${start} – ${end}`;
}

function populateCourses() {
  if (state.subjectId === "all") {
    courseSelect.disabled = true;
    courseSelect.innerHTML = "<option>Select a subject first</option>";
    return;
  }
  courseSelect.disabled = false;
  courseSelect.innerHTML = getCoursesForSubject(state.subjectId).map((course) => `<option value="${course}">${course}</option>`).join("");
}

function slotButton(date, time) {
  const availability = getSlotAvailability({ date, time, subjectId: state.subjectId });
  const status = availability.isOpen ? "open" : "full";
  const tutors = availability.tutors.length;
  const tutorText = tutors === 1 ? "1 tutor available" : `${tutors} tutors available`;
  const label = availability.isOpen ? `Open, ${tutorText}` : "Full, no tutor available";
  return `<button class="calendarSlot calendarSlot--${status}" type="button" ${availability.isOpen ? `data-slot-date="${date}" data-slot-time="${time}"` : "disabled"} aria-label="${dateLabel(date)} at ${formatTime(time)}: ${label}"><strong>${formatTime(time)}</strong><span>${availability.isOpen ? tutorText : "Full"}</span></button>`;
}

function tutorAvatar(tutor) {
  if (PHOTO_POLICY.showTutorPhotos && tutor.photo) return `<img src="${tutor.photo}" alt="${tutor.name}">`;
  return `<span aria-hidden="true">${tutor.initials}</span>`;
}

function openTutorDialog(date, time) {
  selectedSlot = { date, time };
  const availability = getSlotAvailability({ date, time, subjectId: state.subjectId });
  const subjectName = subjects.find((subject) => subject.id === state.subjectId)?.name || "your selected subject";
  tutorDialogContent.innerHTML = `<p class="dialogEyebrow">${dateLabel(date)} · ${formatTime(time)}</p><h2 id="tutor-dialog-title">Choose a tutor</h2><p class="dialogLead">${availability.tutors.length} tutor${availability.tutors.length === 1 ? " is" : "s are"} open for ${subjectName}.</p><div class="tutorChoices">${availability.tutors.map((tutor) => `<article class="tutorChoice"><div class="tutorAvatar">${tutorAvatar(tutor)}</div><div><h3>${tutor.name}</h3><p>${tutor.expertise}</p><details><summary>View full profile</summary><p>${tutor.bio}</p></details></div><button type="button" class="chooseTutor" data-tutor-id="${tutor.id}">Choose tutor</button></article>`).join("")}</div>`;
  tutorDialog.showModal();
}

function showBookingForm(tutorId) {
  tutorDialogContent.innerHTML = `<p class="dialogEyebrow">${dateLabel(selectedSlot.date)} · ${formatTime(selectedSlot.time)}</p><h2 id="tutor-dialog-title">Confirm tutoring request</h2><form id="booking-form" class="bookingForm"><label>Name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Course<input name="course" required value="${courseSelect.disabled ? "" : courseSelect.value}"></label><button class="chooseTutor" type="submit">Request email approval</button><p class="formHint">This prototype simulates first-device email approval. A slot is not held until a booking is final.</p></form>`;
  document.querySelector("#booking-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const draft = { tutorId, ...selectedSlot, student: Object.fromEntries(form) };
    const outcome = service.requestBooking(draft);
    if (outcome.status === "conflict") { tutorDialogContent.innerHTML = "<h2 id=\"tutor-dialog-title\">That tutor was just booked</h2><p>Please close this panel and choose another green time or tutor.</p>"; return; }
    const final = service.approveAndBook(draft);
    tutorDialogContent.innerHTML = `<h2 id="tutor-dialog-title">Booking confirmed</h2><p>A sample confirmation and 24-hour reminders have been queued. In production, the first-device approval email would be sent before this final step.</p>`;
    renderBookings();
    renderCalendar();
  });
}

function renderBookings() {
  const list = document.querySelector("#bookings-list");
  const empty = document.querySelector("#bookings-empty");
  empty.hidden = service.bookings.length > 0;
  list.innerHTML = service.bookings.map((booking) => `<article class="bookingItem"><strong>${dateLabel(booking.date)} · ${formatTime(booking.time)}</strong><span>${booking.student.course} with ${booking.tutorId.replace("-", " ")}</span><button type="button" disabled title="Rescheduling is simulated in this prototype">Manage booking</button></article>`).join("");
}

function renderCalendar() {
  const dates = getWeekDates(state.weekAnchor);
  weekRange.textContent = formatWeekRange(dates);
  const headers = dates.map((date, index) => `<div class="dayHeader ${index === state.mobileDayIndex ? "is-mobile-current" : ""}"><span>${formatDate(date, { weekday: "short" })}</span><strong>${formatDate(date, { day: "numeric" })}</strong></div>`).join("");
  const rows = timeRows.map((time) => `<div class="timeLabel">${formatTime(time)}</div>${dates.map((date, index) => `<div class="calendarCell ${index === state.mobileDayIndex ? "is-mobile-current" : ""}">${slotButton(date, time)}</div>`).join("")}`).join("");
  calendar.innerHTML = `<div class="calendarGrid"><div class="timeCorner">Time</div>${headers}${rows}</div>`;
  mobileDayControls.innerHTML = dates.map((date, index) => `<button type="button" class="dayPill ${index === state.mobileDayIndex ? "is-active" : ""}" data-day-index="${index}">${dateLabel(date)}</button>`).join("");
}

function render() {
  populateCourses();
  renderCalendar();
}

subjectSelect.innerHTML = subjects.map((subject) => `<option value="${subject.id}">${subject.name}</option>`).join("");
subjectSelect.addEventListener("change", () => { state.subjectId = subjectSelect.value; render(); });
document.querySelector("#previous-week").addEventListener("click", () => { state.weekAnchor = addWeeks(state.weekAnchor, -1); renderCalendar(); });
document.querySelector("#next-week").addEventListener("click", () => { state.weekAnchor = addWeeks(state.weekAnchor, 1); renderCalendar(); });
document.querySelector("#today").addEventListener("click", () => { state.weekAnchor = "2026-10-12"; state.mobileDayIndex = 0; renderCalendar(); });
mobileDayControls.addEventListener("click", (event) => {
  const button = event.target.closest("[data-day-index]");
  if (!button) return;
  state.mobileDayIndex = Number(button.dataset.dayIndex);
  renderCalendar();
});
calendar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-slot-date]");
  if (button) openTutorDialog(button.dataset.slotDate, button.dataset.slotTime);
});
document.querySelector("#close-tutor-dialog").addEventListener("click", () => tutorDialog.close());
tutorDialog.addEventListener("click", (event) => { if (event.target === tutorDialog) tutorDialog.close(); });
tutorDialogContent.addEventListener("click", (event) => { const button = event.target.closest(".chooseTutor[data-tutor-id]"); if (button) showBookingForm(button.dataset.tutorId); });
document.querySelector("#submit-sample-schedule").addEventListener("click", () => { service.submitSchedule("maya-chen", state.weekAnchor); service.requestSundayReminder("maya-chen"); document.querySelector("#schedule-status").textContent = "Sample next-week schedule submitted. A Sunday reminder notification was recorded."; });
render();
