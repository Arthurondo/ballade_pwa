// Initialiser la carte centrée sur le monde entier
var map = L.map('map').setView([20, 0], 2);

// Ajouter une couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Charger les marqueurs enregistrés dans le localStorage
let savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];

// Ajouter chaque marqueur enregistré avec une popup contenant un titre
savedMarkers.forEach(markerData => {
    var marker = L.marker(markerData.coords).addTo(map);
    marker.bindPopup(`<b>${markerData.title}</b>`);  // Ajoute un titre au clic
});

// Ajouter un marqueur en cliquant sur la carte
map.on('click', function(e) {
    var title = prompt("Entrez le titre du morceau pour ce lieu :"); // Demande un titre
    if (title) {
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        newMarker.bindPopup(`<b>${title}</b>`);  // Ajoute le titre dans la popup

        // Sauvegarder les marqueurs avec titres
        savedMarkers.push({ coords: [e.latlng.lat, e.latlng.lng], title: title });
        localStorage.setItem("markers", JSON.stringify(savedMarkers));
    }
});
