import { setupModal, openCourseModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initLocalStorage();
    setupModal();
    loadFeaturedCourses();
});

function initNav() {
    const btn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav-bar");
    if (btn && nav) {
        btn.addEventListener("click", () => nav.classList.toggle("open"));
    }
}

function initLocalStorage() {
    const visitDisplay = document.getElementById("visit-message");
    if (!visitDisplay) return;

    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();

    if (!lastVisit) {
        visitDisplay.textContent = "Welcome! This is your first visit to Mundo Creativo.";
    } else {
        const days = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
        visitDisplay.textContent = days < 1 ? "Back so soon! Awesome!" : `Welcome back! It has been ${days} day(s) since your last visit.`;
    }
    localStorage.setItem("lastVisitDate", now.toString());
}

async function loadFeaturedCourses() {
    const grid = document.getElementById("featured-grid");
    if (!grid) return;

    try {
        const response = await fetch("data/courses.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        // Filter top rated items (Array method)
        const featured = data.filter(c => c.rating >= 4.8).slice(0, 3);
        renderCards(featured, grid);
    } catch (error) {
        console.error("Error fetching data:", error);
        grid.innerHTML = `<p class="error">Failed to load courses data.</p>`;
    }
}

export function renderCards(items, container) {
    container.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="300" height="180" loading="lazy">
            <div class="card-body">
                <span class="badge ${item.category}">${item.category}</span>
                <h3>${item.title}</h3>
                <p>Level: <strong>${item.level}</strong></p>
                <p>Rating: ⭐ ${item.rating}</p>
                <button class="details-btn" data-id="${item.id}">View Details</button>
            </div>
        `;

        card.querySelector(".details-btn").addEventListener("click", () => {
            openCourseModal(item);
        });

        container.appendChild(card);
    });
}
