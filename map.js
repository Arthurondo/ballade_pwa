// Initialiser la carte et centrer sur Paris (latitude: 48.8566, longitude: 2.3522)
var map = L.map('map').setView([48.8566, 2.3522], 13);

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajouter un marqueur à Paris
var marker = L.marker([48.8566, 2.3522]).addTo(map);

// Ajouter une popup au marqueur
marker.bindPopup("<b>Bienvenue à Paris !</b><br>Ceci est un marqueur.").openPopup();
