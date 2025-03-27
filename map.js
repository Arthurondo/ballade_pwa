// Initialisation de la carte centrée sur le monde entier
var map = L.map('map').setView([20, 0], 2);

// Ajouter la couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Charger les marqueurs enregistrés dans le localStorage
let savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];

// Fonction pour ajouter un marqueur avec une popup
function addMarker(lat, lng, title) {
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${title}</b>`).openPopup();
    return marker;
}

// Ajouter les marqueurs enregistrés
savedMarkers.forEach(markerData => {
    addMarker(markerData.coords[0], markerData.coords[1], markerData.title);
});

// Ajouter une nouvelle épingle au clic
map.on('click', function (e) {
    var title = prompt("Entrez le titre du morceau pour ce lieu :");
    if (title) {
        addMarker(e.latlng.lat, e.latlng.lng, title);

        // Sauvegarder les marqueurs avec titre
        savedMarkers.push({ coords: [e.latlng.lat, e.latlng.lng], title: title });
        localStorage.setItem("markers", JSON.stringify(savedMarkers));
    }
});
