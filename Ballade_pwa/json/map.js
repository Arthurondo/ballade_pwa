document.addEventListener("DOMContentLoaded", function () {
    // Vérifie que l'élément #map existe bien avant d'initialiser la carte
    const mapElement = document.getElementById("map");
    if (!mapElement) {
        console.error("L'élément #map n'existe pas !");
        return;
    }

    // Initialisation de la carte centrée sur Paris (Zoom 6)
    var map = L.map('map').setView([48.8566, 2.3522], 6);


    // Ajout d'un marqueur à Paris avec un message
    var marker = L.marker([48.8566, 2.3522]).addTo(map);
    marker.bindPopup("Bienvenue à Paris ! 🎶").openPopup();
});
