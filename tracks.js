// Configuration Supabase
const supabaseUrl = 'https://sxwppdcaahnzhkqdvdpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4d3BwZGNhYWhuemhrcWR2ZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.UHtyHqsOPDExggrz5lQmeKAyuOJZhXeVSlASKc6z5sc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Éléments DOM
const tracksTable = document.getElementById('tracks-table');
const messageDiv = document.getElementById('message');
const audioPlayer = document.getElementById('audio-player');

// Charger les morceaux au démarrage
document.addEventListener('DOMContentLoaded', async () => {
    await loadTracks();
});

// Fonction principale pour charger les morceaux
async function loadTracks() {
    try {
        const { data: tracks, error } = await supabase
            .from('songs')  // Remplacez par votre table
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        displayTracks(tracks);
    } catch (error) {
        showMessage('Erreur: ' + error.message, 'error');
        console.error('Erreur Supabase:', error);
    }
}

// Afficher les morceaux dans un tableau
function displayTracks(tracks) {
    if (!tracks || tracks.length === 0) {
        tracksTable.innerHTML = '<p>Aucun morceau trouvé</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Durée</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    tracks.forEach(track => {
        html += `
            <tr>
                <td>${track.title || 'Inconnu'}</td>
                <td>${track.artist || 'Inconnu'}</td>
                <td>${track.duration || '--:--'}</td>
                <td>
                    <button data-audio="${track.audio_url || ''}" 
                            class="play-btn" 
                            ${!track.audio_url ? 'disabled' : ''}>
                        ▶ Écouter
                    </button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    tracksTable.innerHTML = html;

    // Ajout des écouteurs d'événements
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playTrack(btn.dataset.audio);
        });
    });
}

// Jouer un morceau
function playTrack(audioUrl) {
    if (!audioUrl) return;
    
    audioPlayer.src = audioUrl;
    audioPlayer.play().catch(e => {
        showMessage('Erreur de lecture: ' + e.message, 'error');
    });
}

// Afficher un message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Export pour le type module
export { supabase, loadTracks, displayTracks, playTrack, showMessage };
