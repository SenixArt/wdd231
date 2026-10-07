document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("results");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    
    if ([...params].length === 0) {
        container.innerHTML = "<p>No data submitted.</p>";
        return;
    }

    container.innerHTML = `
        <p><strong>Name:</strong> ${params.get("fname")} ${params.get("lname")}</p>
        <p><strong>Email:</strong> ${params.get("email")}</p>
        <p><strong>Phone:</strong> ${params.get("phone")}</p>
        <p><strong>Selected Course:</strong> ${params.get("course")}</p>
        <p><strong>Timestamp:</strong> ${params.get("timestamp")}</p>
    `;
});
