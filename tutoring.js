const SAMPLE_TUTORING_DATA = {
  subjects: [
    {
      id: "algebra",
      name: "Algebra",
      description: "Sample peer support for equations, factoring, and quiz review.",
      tutors: [
        {
          name: "Tutor Orion",
          slots: [
            { period: "morning", label: "7:30 AM", isAvailable: true },
            { period: "lunch", label: "Lunch A", isAvailable: false }
          ]
        },
        {
          name: "Tutor Nova",
          slots: [
            { period: "morning", label: "7:45 AM", isAvailable: false },
            { period: "lunch", label: "Lunch B", isAvailable: true }
          ]
        }
      ]
    },
    {
      id: "biology",
      name: "Biology",
      description: "Sample tutoring for cell concepts, labs, and chapter checks.",
      tutors: [
        {
          name: "Tutor Atlas",
          slots: [
            { period: "morning", label: "7:35 AM", isAvailable: true },
            { period: "lunch", label: "Lunch A", isAvailable: true }
          ]
        }
      ]
    },
    {
      id: "essay-writing",
      name: "Essay Writing",
      description: "Sample support for thesis planning and revision strategy.",
      tutors: [
        {
          name: "Tutor Ember",
          slots: [
            { period: "morning", label: "7:40 AM", isAvailable: false },
            { period: "lunch", label: "Lunch B", isAvailable: true }
          ]
        }
      ]
    },
    {
      id: "robotics",
      name: "Robotics",
      description: "Sample subject option with no tutors assigned yet.",
      tutors: []
    },
    {
      id: "world-history",
      name: "World History",
      description: "Sample subject option where all sample times are filled.",
      tutors: [
        {
          name: "Tutor Vega",
          slots: [
            { period: "morning", label: "7:30 AM", isAvailable: false },
            { period: "lunch", label: "Lunch A", isAvailable: false }
          ]
        }
      ]
    }
  ]
};

const subjectSelect = document.querySelector("#subject-select");
const results = document.querySelector("#results");
const selectionMessage = document.querySelector("#selection-message");

const availabilityLabel = {
  morning: "Morning",
  lunch: "Lunch"
};

function getSelectedSubject() {
  return SAMPLE_TUTORING_DATA.subjects.find((subject) => subject.id === subjectSelect.value);
}

function hasOpenTimes(subject) {
  return subject.tutors.some((tutor) => tutor.slots.some((slot) => slot.isAvailable));
}

function renderNoTutorsState(subject) {
  results.innerHTML = `
    <article class="stateCard" role="status">
      <h3>No sample tutors listed</h3>
      <p>${subject.description} All availability shown on this page is sample data.</p>
    </article>
  `;
}

function renderNoOpenTimesState(subject) {
  results.innerHTML = `
    <article class="stateCard" role="status">
      <h3>No sample open times</h3>
      <p>${subject.description} Check another subject to view sample open times.</p>
    </article>
  `;
}

function handleTimeSelection(subjectName, tutorName, slotLabel, periodName) {
  selectionMessage.textContent = `${subjectName}: ${tutorName} ${periodName} ${slotLabel} selected as sample data. No reservation was made.`;
}

function renderTutorCards(subject) {
  results.innerHTML = "";

  subject.tutors.forEach((tutor) => {
    const card = document.createElement("article");
    card.className = "tutorCard";

    const heading = document.createElement("h3");
    heading.textContent = `${tutor.name} (sample)`;

    const details = document.createElement("p");
    details.textContent = `${subject.description} All times below are sample data.`;

    const slots = document.createElement("ul");
    slots.className = "slotList";

    tutor.slots.forEach((slot) => {
      const item = document.createElement("li");
      item.className = "slot";

      const periodTag = document.createElement("span");
      periodTag.className = `slotLabel slotLabel--${slot.period}`;
      periodTag.textContent = availabilityLabel[slot.period];

      const time = document.createElement("span");
      time.className = "slotText";
      time.textContent = slot.label;

      const status = document.createElement("span");
      status.className = `slotStatus slotStatus--${slot.isAvailable ? "available" : "unavailable"}`;
      status.textContent = slot.isAvailable ? "Available" : "Unavailable";

      item.append(periodTag, time, status);

      if (slot.isAvailable) {
        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.className = "timeButton";
        selectButton.textContent = "Select sample time";
        selectButton.addEventListener("click", () => {
          handleTimeSelection(subject.name, tutor.name, slot.label, availabilityLabel[slot.period]);
        });
        item.append(selectButton);
      }

      slots.append(item);
    });

    card.append(heading, details, slots);
    results.append(card);
  });
}

function renderSubject() {
  const subject = getSelectedSubject();
  selectionMessage.textContent = "";

  if (!subject.tutors.length) {
    renderNoTutorsState(subject);
    return;
  }

  if (!hasOpenTimes(subject)) {
    renderNoOpenTimesState(subject);
    return;
  }

  renderTutorCards(subject);
}

function buildSubjectOptions() {
  SAMPLE_TUTORING_DATA.subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    subjectSelect.append(option);
  });
}

buildSubjectOptions();
subjectSelect.addEventListener("change", renderSubject);
renderSubject();
