const appointmentList = document.getElementById("appointmentList");
const cancelPopup = document.getElementById("cancelPopup");
const cancelMsg = document.getElementById("cancelMsg");
const welcomeText = document.getElementById("welcomeText");

let loggedInDoctor = localStorage.getItem("loggedInDoctor");


if (!loggedInDoctor) {
  alert("Please log in as a doctor first.");
  window.location.href = "doctor-login.html";
}


welcomeText.textContent = `Welcome, ${loggedInDoctor}!`;


let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];


let myAppointments = allBookings.filter((b) => b.doctor === loggedInDoctor);

function renderAppointments() {
  appointmentList.innerHTML = "";
  if (myAppointments.length === 0) {
    appointmentList.innerHTML = "<li>No appointments found.</li>";
    return;
  }

  myAppointments.forEach((appointment, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${appointment.patient} - ${appointment.date}
      <button class="cancel-btn">Cancel</button>
    `;

    li.querySelector(".cancel-btn").addEventListener("click", () => {
      if (confirm(`Cancel appointment with ${appointment.patient}?`)) {
        
        allBookings = allBookings.filter(
          (b) =>
            !(
              b.patient === appointment.patient &&
              b.date === appointment.date &&
              b.doctor === loggedInDoctor
            )
        );
        localStorage.setItem("bookings", JSON.stringify(allBookings));
        myAppointments = allBookings.filter((b) => b.doctor === loggedInDoctor);
        renderAppointments();
        showCancelPopup(`Appointment with ${appointment.patient} cancelled.`);
      }
    });

    appointmentList.appendChild(li);
  });
}

function showCancelPopup(message) {
  cancelMsg.textContent = message;
  cancelPopup.classList.remove("hidden");
}

function closeCancelPopup() {
  cancelPopup.classList.add("hidden");
}

renderAppointments();

function showSection(sectionId) {
  const sections = document.querySelectorAll(".dashboard-section");
  sections.forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

document.getElementById("docName").textContent = loggedInDoctor || "Doctor";

showSection("appointments");

function logout() {
  localStorage.removeItem("loggedInDoctor");
  window.location.href = "doctor-login.html";
}