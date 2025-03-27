// Initialiser la carte et l'afficher sur une vue du monde entier
var map = L.map('map').setView([20, 0], 2);  // Coordonnées approximatives pour voir toute la planète

// Ajouter une couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Charger les marqueurs enregistrés dans le localStorage
let savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];

// Ajouter chaque marqueur enregistré
savedMarkers.forEach(coord => {
    L.marker(coord).addTo(map);
});

// Ajouter un marqueur en cliquant sur la carte
map.on('click', function(e) {
    var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    
    // Ajouter aux marqueurs sauvegardés
    savedMarkers.push([e.latlng.lat, e.latlng.lng]);
    localStorage.setItem("markers", JSON.stringify(savedMarkers));
});
