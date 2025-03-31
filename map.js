// Configuration Supabase
const supabaseUrl = 'https://sxwppdcaahnzhkqdvdpd.supabase.co';
const supabaseKey = 'eyJhbGci0iJIUzI1NiIsInR5cCIGIkpXVCJ9.eyJpc3Mi0iJ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Initialisation de la carte
const map = L.map('map').setView([20, 0], 2);

// Couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fonction pour charger les pays et morceaux
async function loadCountriesAndTracks() {
    try {
        // 1. Charger les pays depuis Supabase
        const { data: countries, error: countriesError } = await supabase
            .from('countries')
            .select('*');
        
        if (countriesError) throw countriesError;

        // 2. Charger les morceaux depuis Supabase
        const { data: tracks, error: tracksError } = await supabase
            .from('tracks')
            .select('*');
        
        if (tracksError) throw tracksError;

        // 3. Organiser les morceaux par pays
        const tracksByCountry = {};
        tracks.forEach(track => {
            if (!tracksByCountry[track.country_id]) {
                tracksByCountry[track.country_id] = [];
            }
            tracksByCountry[track.country_id].push(track);
        });

        // 4. Ajouter les marqueurs sur la carte
        countries.forEach(country => {
            const countryTracks = tracksByCountry[country.id] || [];
            
            const marker = L.marker([country.latitude, country.longitude]).addTo(map);
            
            let popupContent = `<b>${country.name}</b><br><br>`;
            
            if (countryTracks.length > 0) {
                popupContent += '<div class="tracks-list"><h4>Morceaux :</h4><ul>';
                countryTracks.forEach(track => {
                    popupContent += `
                        <li>
                            <a href="track.html?id=${track.id}">
                                ${track.title} - ${track.artist}
                            </a>
                        </li>`;
                });
                popupContent += '</ul></div>';
            } else {
                popupContent += '<p>Aucun morceau enregistré pour ce pays</p>';
            }
            
            marker.bindPopup(popupContent);
        });

        document.getElementById('loading').style.display = 'none';
        
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('loading').textContent = 'Erreur de chargement des données';
    }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadCountriesAndTracks();
});

// Fonction pour ajouter un nouveau pays (admin seulement)
async function addCountry(name, lat, lng) {
    const { data, error } = await supabase
        .from('countries')
        .insert([{ name, latitude: lat, longitude: lng }]);
    
    if (error) {
        console.error('Erreur:', error);
        return null;
    }
    return data;
}
