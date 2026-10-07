import { renderCards } from "./main.js";
import { setupModal } from "./modal.js";

let allCourses = [];

document.addEventListener("DOMContentLoaded", () => {
    setupModal();
    fetchAndDisplay();
    setupFilters();
});

async function fetchAndDisplay() {
    const grid = document.getElementById("courses-grid");
    if (!grid) return;

    try {
        const res = await fetch("data/courses.json");
        if (!res.ok) throw new Error("Data fetch error");
        allCourses = await res.json();
        renderCards(allCourses, grid);
    } catch (err) {
        console.error("Fetch error:", err);
        grid.innerHTML = `<p class="error">Error loading 15 courses.</p>`;
    }
}

function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const grid = document.getElementById("courses-grid");

    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            buttons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const cat = e.target.getAttribute("data-cat");
            if (cat === "all") {
                renderCards(allCourses, grid);
            } else {
                const filtered = allCourses.filter(item => item.category === cat);
                renderCards(filtered, grid);
            }
        });
    });
}
