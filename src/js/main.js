document.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.classList.contains("volunteer")) {
    const val = e.target.value;
    handleVolunteerSelect(val);
  }
}

// Hide/show volunteer options dropdown
function handleVolunteerSelect(val) {
  const volunteerOptions = document.querySelector("#volunteer-options");
  volunteerOptions.dataset.isVolunteer = val.toLowerCase();
}
