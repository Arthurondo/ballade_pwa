async function fetchWeather() {
    const weatherContainer = document.getElementById('weather-data');
    const apiKey = "12b6faede5304ff68c0101208250104"; // À sécuriser en production
    
    try {
        const response = await fetch(`/api/weather?city=Strasbourg`);
        if (!response.ok) throw new Error('Erreur API');
        
        const data = await response.json();
        
        weatherContainer.innerHTML = `
            <div class="weather-data">
                <div class="weather-temp">${data.temp_c}°C</div>
                <div>
                    <div class="weather-desc">${data.condition.text}</div>
                    <div>Humidité: ${data.humidity}%</div>
                </div>
                <img class="weather-icon" src="${data.condition.icon}" alt="${data.condition.text}">
            </div>
        `;
    } catch (error) {
        weatherContainer.innerHTML = `
            <div class="weather-error">
                <i class="fas fa-exclamation-triangle"></i> Météo indisponible
            </div>
        `;
        console.error('Erreur météo:', error);
    }
}

// Charger la météo au démarrage
document.addEventListener('DOMContentLoaded', fetchWeather);