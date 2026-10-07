export function setupModal() {
    const dialog = document.getElementById("course-dialog");
    const closeBtn = document.getElementById("close-modal");

    if (closeBtn && dialog) {
        closeBtn.addEventListener("click", () => dialog.close());
    }
}

export function openCourseModal(item) {
    const dialog = document.getElementById("course-dialog");
    if (!dialog) return;

    document.getElementById("modal-title").textContent = item.title;
    document.getElementById("modal-category").textContent = `Category: ${item.category.toUpperCase()}`;
    document.getElementById("modal-level").textContent = `Level: ${item.level}`;
    document.getElementById("modal-duration").textContent = `Duration: ${item.duration}`;
    document.getElementById("modal-rating").textContent = `Rating: ⭐ ${item.rating} / 5`;
    document.getElementById("modal-description").textContent = item.description;

    dialog.showModal();
}
