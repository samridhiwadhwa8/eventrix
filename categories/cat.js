    document.querySelectorAll(".view-details").forEach(button => {
      button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        details.style.display = details.style.display === "block" ? "none" : "block";
      });
    });



    // Search functionality
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  let filter = searchInput.value.toLowerCase();
  let cards = document.querySelectorAll(".event-card");

  cards.forEach(card => {
    let title = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = title.includes(filter) ? "block" : "none";
  });
});

//toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Sort functionality
const sortSelect = document.getElementById("sortSelect");
const eventContainer = document.querySelector(".event-container");

sortSelect.addEventListener("change", () => {
  let cards = Array.from(document.querySelectorAll(".event-card"));

  if (sortSelect.value === "name") {
    cards.sort((a, b) => 
      a.querySelector("h2").textContent.localeCompare(b.querySelector("h2").textContent)
    );
  } 
  else if (sortSelect.value === "date") {
    cards.sort((a, b) => {
      let dateA = new Date(a.querySelector("p").textContent.replace("Date: ", ""));
      let dateB = new Date(b.querySelector("p").textContent.replace("Date: ", ""));
      return dateA - dateB;
    });
  } 
  else if (sortSelect.value === "price") {
    cards.sort((a, b) => {
      let priceA = parseInt(a.querySelector(".details p:nth-of-type(3)").textContent.replace(/\D/g, ""));
      let priceB = parseInt(b.querySelector(".details p:nth-of-type(3)").textContent.replace(/\D/g, ""));
      return priceA - priceB;
    });
  }

  // Re-append cards in sorted order
  cards.forEach(card => eventContainer.appendChild(card));
});




// Update the openBooking function to handle movie, concert, and general
function openBooking(type, title, price) {
  currentEvent = { type, title, price };
  document.getElementById("eventTitle").innerText = "Booking - " + title;
  let form = "";

  if (type === "movie") {
    form += `<label>Select number of persons:</label>
             <input type="number" id="numPersons" min="1" max="6" value="1" onchange="updateTotal()">`;

    form += `<p>Select Seats:</p><div class="seats">`;
    const rows = ['A','B','C'];
    for (let r = 0; r < rows.length; r++) {
      for (let i = 1; i <= 6; i++) {
        form += `<div class="seat" onclick="toggleSeat('${rows[r]}${i}')">${rows[r]}${i}</div>`;
      }
    }
    form += `</div>`;
  }

  else if (type === "concert") {
    form += `<label>Select Ticket Type:</label>
             <select id="ticketType" onchange="updateTotal()">
               <option value="5000">Gold - ₹5000</option>
               <option value="8000">Platinum - ₹8000</option>
               <option value="3000">Silver - ₹3000</option>
             </select>
             <label>Number of Tickets:</label>
             <input type="number" id="numTickets" min="1" value="1" onchange="updateTotal()">`;
  }

  else { // general events
    form += `<label>Number of Tickets:</label>
             <input type="number" id="numTickets" min="1" value="1" onchange="updateTotal()">`;
  }

  document.getElementById("bookingForm").innerHTML = form;
  document.getElementById("bookingModal").style.display = "flex";
  selectedSeats = [];
  updateTotal();
}

function toggleSeat(seatLabel) {
  const seatEl = Array.from(document.querySelectorAll(".seat")).find(s => s.textContent === seatLabel);
  if (selectedSeats.includes(seatLabel)) {
    selectedSeats = selectedSeats.filter(s => s !== seatLabel);
    seatEl.classList.remove("selected");
  } else {
    selectedSeats.push(seatLabel);
    seatEl.classList.add("selected");
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  if (currentEvent.type === "movie") {
    let persons = document.getElementById("numPersons").value || 1;
    total = persons * currentEvent.price;
  }
  else if (currentEvent.type === "concert") {
    let ticketPrice = parseInt(document.getElementById("ticketType").value);
    let num = document.getElementById("numTickets").value || 1;
    total = ticketPrice * num;
  }
  else { // general
    let num = document.getElementById("numTickets").value || 1;
    total = num * currentEvent.price;
  }
  document.getElementById("totalPrice").innerHTML = `<strong>Total: ₹${total}</strong>` + 
    (currentEvent.type === "movie" ? `<br>Seats: ${selectedSeats.join(", ")}` : '');
}

function confirmBooking() {
  let message = `🎉 Booking Confirmed for "${currentEvent.title}"!\n`;

  if (currentEvent.type === "movie") {
    message += `Seats: ${selectedSeats.join(", ")}\n`;
    let persons = document.getElementById("numPersons").value || 1;
    message += `Number of Persons: ${persons}\n`;
  } 
  else if (currentEvent.type === "concert") {
    let ticketType = document.getElementById("ticketType").selectedOptions[0].text;
    let num = document.getElementById("numTickets").value || 1;
    message += `Ticket Type: ${ticketType}\nNumber of Tickets: ${num}\n`;
  } 
  else { // general events
    let num = document.getElementById("numTickets").value || 1;
    message += `Number of Tickets: ${num}\n`;
  }

  // Show total price
  let totalText = document.getElementById("totalPrice").textContent;
  message += totalText;

  alert(message);      // show confirmation alert
  closeModal();        // close the booking modal
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
  selectedSeats = [];  // reset selected seats
  document.getElementById("bookingForm").innerHTML = ""; // clear form
  document.getElementById("totalPrice").innerHTML = `<strong>Total: ₹0</strong>`; // reset total
}



function openAddEvent() {
  document.getElementById("addEventModal").style.display = "flex";
}

function closeAddEventModal() {
  document.getElementById("addEventModal").style.display = "none";
}

function addNewEvent() {
  const name = document.getElementById("newEventName").value;
  const location = document.getElementById("newEventLocation").value;
  const date = document.getElementById("newEventDate").value;
  const time = document.getElementById("newEventTime").value;
  const price = document.getElementById("newEventPrice").value;
  const description = document.getElementById("newEventDescription").value;
  const image = document.getElementById("newEventImage").value;

  if (!name || !location || !date || !time || !price) {
    alert("Please fill in all required fields!");
    return;
  }

  const eventContainer = document.querySelector(".event-container");
  const newCard = document.createElement("div");
  newCard.className = "event-card";
  newCard.innerHTML = `
    <img src="${image || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="${name}" class="event-image">
    <div class="event-content">
      <h2>${name}</h2>
      <p>Date: ${new Date(date).toDateString()}</p>
      <p>Location: ${location}</p>
      <button class="view-details">View Details</button>
      <div class="details">
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Tickets:</strong> ₹${price}</p>
        <a href="tel:+911234567890">📞 Call</a>
        <a href="https://maps.google.com" target="_blank">📍 Directions</a>
        <a href="mailto:info@event.com">✉️ Enquiry</a>
        <button class="btn book-now" onclick="openBooking('movie', '${name}', ${price})">🎟️ Book Now</button>
      </div>
    </div>
  `;
  eventContainer.appendChild(newCard);

  // Re-add toggle for view details
  newCard.querySelector(".view-details").addEventListener("click", () => {
    const details = newCard.querySelector(".details");
    details.style.display = details.style.display === "block" ? "none" : "block";
  });

  closeAddEventModal();
}
