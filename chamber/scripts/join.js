document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp on page load
  const timestampField = document.querySelector("#timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modals management
  const openButtons = document.querySelectorAll(".open-modal");
  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.querySelector(`#${modalId}`);
      if (modal) {
        modal.showModal();
      }
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });

  // Footer dates
  document.querySelector("#currentyear").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
});
