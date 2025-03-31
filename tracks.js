// Configuration Supabase
const supabaseUrl = 'https://ssvppdcsahmzhkqdydpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzH1NikInRScCI6IkyXVcJ9.eyJpe3MfOJZnXBhYnrFzZSIsInJIZifelnN4d3BwZGNhYWbuennhrcWR2ZHBkItivicm9xZ5l6ImPub24ILClyYXQiQENNDiyMzY2MjIainV4cCl6MjA1NzgxMyYyMn0.UHryHgoOPD';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await loadCountries();
    await loadExistingTracks();
    setupForm();
});

// Charger les morceaux existants
async function loadExistingTracks() {
    const { data: tracks, error } = await supabase
        .from('tracks')
        .select(`
            id,
            title,
            artist,
            audio_url,
            description,
            countries (name)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        showMessage('Erreur lors du chargement des morceaux: ' + error.message, 'error');
        return;
    }

    const tracksContainer = document.createElement('div');
    tracksContainer.id = 'existing-tracks';
    tracksContainer.innerHTML = '<h2>Morceaux existants</h2>';

    if (tracks.length === 0) {
        tracksContainer.innerHTML += '<p>Aucun morceau enregistré</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Pays</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        tracks.forEach(track => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${track.title}</td>
                <td>${track.artist}</td>
                <td>${track.countries?.name || 'Inconnu'}</td>
                <td>
                    <button onclick="playTrack('${track.audio_url}')" ${!track.audio_url ? 'disabled' : ''}>Écouter</button>
                    <button onclick="editTrack('${track.id}')">Modifier</button>
                </td>
            `;
            table.querySelector('tbody').appendChild(row);
        });

        tracksContainer.appendChild(table);
    }

    document.querySelector('form').after(tracksContainer);
}

// Fonction pour jouer un morceau
window.playTrack = function(audioUrl) {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch(e => console.error("Erreur de lecture:", e));
    }
};

// Fonction pour modifier un morceau
window.editTrack = function(trackId) {
    window.location.href = `edit-track.html?id=${trackId}`;
};

// Fonction pour charger les pays
async function loadCountries() {
    const countrySelect = document.getElementById('country');
    const { data: countries, error } = await supabase
        .from('countries')
        .select('id, name')
        .order('name', { ascending: true });

    if (error) {
        showMessage('Erreur lors du chargement des pays: ' + error.message, 'error');
        return;
    }

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

// Configurer le formulaire
function setupForm() {
    const form = document.getElementById('trackForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const country_id = document.getElementById('country').value;
        const audio_url = document.getElementById('audio_url').value;
        const description = document.getElementById('description').value;

        if (!title || !artist || !country_id) {
            showMessage('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        const { data, error } = await supabase
            .from('tracks')
            .insert([{ 
                title, 
                artist, 
                country_id,
                audio_url: audio_url || null,
                description: description || null
            }])
            .select();

        if (error) {
            showMessage('Erreur lors de l\'ajout: ' + error.message, 'error');
        } else {
            showMessage('Morceau ajouté avec succès! ID: ' + data[0].id, 'success');
            form.reset();
            // Recharger la liste
            await loadExistingTracks();
        }
    });
}

// Afficher un message
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
