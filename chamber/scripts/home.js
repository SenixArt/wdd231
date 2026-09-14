// Footer dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// -------------------------------------------------------------
// 1. WEATHER API (OpenWeatherMap)
// -------------------------------------------------------------
const apiKey = "d9e8631b34cd0f10c85c2c7f55f69206"; // Tu API Key o de pruebas
const lat = 10.6316; // Coordenadas locales (Maracaibo / San Francisco)
const lon = -71.6406;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }
        
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector("#current-weather");
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherContainer.innerHTML = `
        <img src="${icon}" alt="${desc}" width="60" height="60">
        <div>
            <p><strong>${temp} °C</strong></p>
            <p style="text-transform: capitalize;">${desc}</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#weather-forecast");
    forecastContainer.innerHTML = "";

    // Filtramos para tomar una lectura por día (12:00 PM)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        const p = document.createElement("p");
        p.innerHTML = `${date}: <strong>${temp} °C</strong>`;
        forecastContainer.appendChild(p);
    });
}

getWeather();

// -------------------------------------------------------------
// 2. MEMBER SPOTLIGHTS (JSON Fetch & Random Filter)
// -------------------------------------------------------------
const membersUrl = "data/members.json";

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            
            // Filtrar solo Gold (3) y Silver (2)
            const qualified = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver" || m.membershipLevel === 3 || m.membershipLevel === 2);
            
            // Mezclar aleatoriamente
            const shuffled = qualified.sort(() => 0.5 - Math.random());
            
            // Tomar 2 o 3 miembros
            const selected = shuffled.slice(0, 3);
            
            displaySpotlights(selected);
        }
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        const levelName = typeof member.membershipLevel === "number" 
            ? (member.membershipLevel === 3 ? "Gold" : "Silver") 
            : member.membershipLevel;

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p><strong>Level:</strong> ${levelName}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

getSpotlights();
