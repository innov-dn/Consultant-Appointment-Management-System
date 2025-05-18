const bookButtons = document.querySelectorAll(".book-btn");
const popup = document.getElementById("popup");
const popupMsg = document.getElementById("popupMsg");
const bookingList = document.getElementById("bookingList");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];


window.addEventListener("DOMContentLoaded", () => {
  bookings.forEach((booking) => {
    addBookingToDOM(booking.doctor, booking.date);
  });
});

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".doctor-card");
    const name = card.querySelector("h3").textContent;
    const date = card.querySelector("input").value;

    if (!date) {
      showPopup("Please select a date before booking.");
      return;
    }

    
    const newBooking = {
      patient: prompt("Enter your name:"), 
      doctor: name,
      date: date,
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    addBookingToDOM(name, date);
    showPopup(`Appointment booked with ${name} on ${date}`);
    card.querySelector("input").value = "";
  });
});

function addBookingToDOM(doctor, date) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${doctor} - ${date}
    <button class="delete-btn">Delete</button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this booking?")) {
    
      bookingList.removeChild(li);

      bookings = bookings.filter(
        (b) => !(b.doctor === doctor && b.date === date)
      );
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  });

  bookingList.appendChild(li);
}

function showPopup(message) {
  popupMsg.textContent = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
}