import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

const supabaseUrl = 'https://sxwppdcaahnzhkqdvdpd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4d3BwZGNhYWhuemhrcWR2ZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.UHtyHqsOPDExggrz5lQmeKAyuOJZhXeVSlASKc6z5sc'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fonction pour charger les morceaux
async function loadTracks() {
    const { data: tracks, error } = await supabase
        .from('songs')
        .select(`
            id,
            title,
            artist,
            audio_url,
            duration
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Erreur:', error)
        document.getElementById('message').textContent = 'Erreur de chargement des morceaux'
        return
    }

    displayTracks(tracks)
}

// Fonction pour afficher les morceaux
function displayTracks(tracks) {
    const container = document.getElementById('tracks-table')
    container.innerHTML = ''

    tracks.forEach(track => {
        const trackElement = document.createElement('div')
        trackElement.className = 'track'
        trackElement.innerHTML = `
            <div class="track-info">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
                <p>${formatDuration(track.duration)}</p>
            </div>
            <button class="play-btn" data-audio="${track.audio_url}">
                <i class="fas fa-play"></i>
            </button>
        `
        container.appendChild(trackElement)
    })

    // Gestion des clics sur les boutons de lecture
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const audioUrl = e.currentTarget.getAttribute('data-audio')
            playAudio(audioUrl)
        })
    })
}

// Fonction pour jouer l'audio
function playAudio(audioUrl) {
    const audioPlayer = document.getElementById('audio-player')
    const noAudioMsg = document.querySelector('.no-audio')
    
    if (audioUrl) {
        audioPlayer.src = audioUrl
        audioPlayer.play()
        noAudioMsg.style.display = 'none'
    } else {
        noAudioMsg.style.display = 'block'
        noAudioMsg.textContent = 'Aucun fichier audio disponible'
    }
}

// Formatage de la durée
function formatDuration(seconds) {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// Initialisation
document.addEventListener('DOMContentLoaded', loadTracks)
