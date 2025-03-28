// map.js
// Initialisation de la carte centrée sur le monde
var map = L.map('map').setView([20, 0], 2);

// Ajouter la couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Coordonnées des 10 plus grands pays (latitude, longitude)
const bigCountries = [
    { name: "Russie", coords: [61.5240, 105.3188], area: "17.1M km²" },
    { name: "Canada", coords: [56.1304, -106.3468], area: "9.98M km²" },
    { name: "Chine", coords: [35.8617, 104.1954], area: "9.59M km²" },
    { name: "États-Unis", coords: [37.0902, -95.7129], area: "9.52M km²" },
    { name: "Brésil", coords: [-14.2350, -51.9253], area: "8.51M km²" },
    { name: "Australie", coords: [-25.2744, 133.7751], area: "7.69M km²" },
    { name: "Inde", coords: [20.5937, 78.9629], area: "3.29M km²" },
    { name: "Argentine", coords: [-38.4161, -63.6167], area: "2.78M km²" },
    { name: "Kazakhstan", coords: [48.0196, 66.9237], area: "2.72M km²" },
    { name: "Algérie", coords: [28.0339, 1.6596], area: "2.38M km²" }
];

// Icône personnalisée
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Ajouter les marqueurs pour les grands pays
bigCountries.forEach(country => {
    const marker = L.marker(country.coords, { icon: customIcon }).addTo(map);
    marker.bindPopup(`
        <b>${country.name}</b><br>
        Superficie: ${country.area}
        <div class="note-form">
            <textarea id="note-${country.name}" placeholder="Ajoutez une note..."></textarea>
            <button onclick="saveNote('${country.name}')">Enregistrer</button>
        </div>
    `);
    
    // Charger les notes sauvegardées
    const savedNote = localStorage.getItem(`note-${country.name}`);
    if (savedNote) {
        document.getElementById(`note-${country.name}`).value = savedNote;
    }
});

// Fonction pour sauvegarder les notes
window.saveNote = function(countryName) {
    const note = document.getElementById(`note-${countryName}`).value;
    localStorage.setItem(`note-${countryName}`, note);
    alert("Note enregistrée !");
};

// Ajouter un nouveau marqueur au clic sur la carte
map.on('click', function(e) {
    const title = prompt("Entrez un nom pour ce lieu :");
    if (title) {
        const marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <b>${title}</b>
            <div class="note-form">
                <textarea id="note-custom" placeholder="Ajoutez une note..."></textarea>
                <button onclick="saveNote('custom')">Enregistrer</button>
            </div>
        `);
    }
});
