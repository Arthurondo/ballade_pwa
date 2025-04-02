import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

// Initialisation Supabase
const supabaseUrl = '*https://sxwppdcaahnzhkqdvdpd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4d3BwZGNhYWhuemhrcWR2ZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.UHtyHqsOPDExggrz5lQmeKAyuOJZhXeVSlASKc6z5sc'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fonction pour charger et afficher les morceaux
async function loadSongs() {
    // 1. Récupération des données
    const { data: songs, error } = await supabase
        .from('songs')
        .select(`
            id,
            title,
            composer:composers(name),
            instruments:song_instruments(instrument:instruments(name))
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Erreur:', error)
        document.getElementById('message').textContent = 'Erreur de chargement'
        return
    }

    // 2. Affichage dans le HTML
    const container = document.getElementById('tracks-table')
    container.innerHTML = ''

    if (songs.length === 0) {
        container.innerHTML = '<p>Aucun morceau trouvé</p>'
        return
    }

    songs.forEach(song => {
        // Formatage des instruments
        const instruments = song.instruments
            .map(si => si.instrument.name)
            .join(', ')

        const songElement = document.createElement('div')
        songElement.className = 'track-item'
        songElement.innerHTML = `
            <div class="track-info">
                <h3 class="track-title">${song.title}</h3>
                <p class="track-composer">Compositeur: ${song.composer.name}</p>
                <p class="track-instruments">Instruments: ${instruments}</p>
            </div>
            <button class="btn btn-play" onclick="playSong(${song.id})">
                <i class="fas fa-play"></i> Écouter
            </button>
        `
        container.appendChild(songElement)
    })
}

// Fonction pour jouer un morceau
window.playSong = async function(songId) {
    const { data: song, error } = await supabase
        .from('songs')
        .select('audio_url')
        .eq('id', songId)
        .single()

    if (song?.audio_url) {
        const player = document.getElementById('audio-player')
        player.src = song.audio_url
        player.play()
    }
}

// Chargement initial
document.addEventListener('DOMContentLoaded', loadSongs)
