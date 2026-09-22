document.addEventListener("DOMContentLoaded", () => {
  const currentUrl = window.location.href;
  const formData = new URLSearchParams(currentUrl.search);
  const resultsContainer = document.querySelector("#results");

  if (formData.has("fname") && resultsContainer) {
    const formattedDate = new Date(formData.get("timestamp")).toLocaleString();

    resultsContainer.innerHTML = `
      <p><strong>First Name:</strong> ${formData.get("fname")}</p>
      <p><strong>Last Name:</strong> ${formData.get("lname")}</p>
      <p><strong>Email:</strong> ${formData.get("email")}</p>
      <p><strong>Phone:</strong> ${formData.get("phone")}</p>
      <p><strong>Organization:</strong> ${formData.get("organization")}</p>
      <p><strong>Submission Time:</strong> ${formattedDate}</p>
    `;
  }

  // Footer dates
  document.querySelector("#currentyear").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
});
