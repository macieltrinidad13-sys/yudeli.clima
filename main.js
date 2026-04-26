const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const container = document.getElementById('weatherContainer');

async function getWeather(city) {
    if (!city) return;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ciudad no encontrada');
        const data = await response.ok ? await response.json() : null;
        createCard(data);
        cityInput.value = '';
    } catch (error) {
        alert(error.message);
    }
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
        <div class="weather-card">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times-circle fa-lg"></i>
            </button>
            <h3>${data.name}, ${data.sys.country}</h3>
            <div class="weather-icon mt-3">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="icon">
            </div>
            <p class="temp">${Math.round(data.main.temp)}°C</p>
            <p class="text-capitalize fs-4">${data.weather[0].description} 🌡️</p>
            <div class="d-flex justify-content-around mt-3">
                <span>💧 ${data.main.humidity}%</span>
                <span>💨 ${data.wind.speed} m/s</span>
            </div>
        </div>
    `;
    container.prepend(card);
}

searchBtn.addEventListener('click', () => getWeather(cityInput.value));

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather(cityInput.value);
});
