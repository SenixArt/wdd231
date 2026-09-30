import { items } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
  displayVisitorMessage();
  renderCards(items);
});

// 1. Mensaje personalizado de visitas usando localStorage
function displayVisitorMessage() {
  const messageElement = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisitDate');
  const now = Date.now();

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysBetween < 1) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      messageElement.textContent = "You last visited 1 day ago.";
    } else {
      messageElement.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  // Guardar la fecha actual de la visita
  localStorage.setItem('lastVisitDate', now.toString());
}

// 2. Generación de las 8 tarjetas
function renderCards(data) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.style.gridArea = `card${index + 1}`; // Asigna el área named grid

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    `;

    container.appendChild(card);
  });
}
