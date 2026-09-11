// Set the current year and last modified date in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Fetch and display members
const url = 'data/members.json';
const display = document.querySelector('#directory-container');

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMembers(members) {
    display.innerHTML = ""; 
    members.forEach((member) => {
        let card = document.createElement('section');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="auto">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
        `;
        display.appendChild(card);
    });
}

// Toggle Grid and List views
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

// Call the function
getMembersData();
