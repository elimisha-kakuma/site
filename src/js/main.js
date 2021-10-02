document.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.classList.contains("accordion__button")) {
    handleAccordion(e);
  }

  if (e.target.classList.contains("volunteer")) {
    const val = e.target.value;
    handleVolunteerSelect(val);
  }
}

// Expand/collapse accordion
function handleAccordion(e) {
  const accordion = e.target.closest(".accordion");
  accordion.classList.toggle("expanded");

  accordion.classList.contains("expanded")
    ? (e.target.textContent = "Less [-]")
    : (e.target.textContent = "More [+]");
}

// Hide/show volunteer options dropdown
function handleVolunteerSelect(val) {
  const volunteerOptions = document.querySelector("#volunteer-options");
  volunteerOptions.dataset.isVolunteer = val;
}
