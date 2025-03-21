// Liste des morceaux locaux
const tracks = [
    {
        title: "Track 1",
        artist: "Artiste 1",
        file: "static/music/track1.mp3"
    },
    {
        title: "Track 2",
        artist: "Artiste 2",
        file: "static/music/track2.mp3"
    },
    {
        title: "Track 3",
        artist: "Artiste 3",
        file: "static/music/track3.mp3"
    }
];

// Afficher la liste des morceaux sur tracks.html
function displayTrackList() {
    const trackListElement = document.getElementById("track-list");

    tracks.forEach((track, index) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `track_detail.html?index=${index}`;
        link.textContent = track.title;
        listItem.appendChild(link);
        trackListElement.appendChild(listItem);
    });
}

// Récupérer l'index du morceau depuis l'URL (sur la page de détails)
function getTrackIndex() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("index"));
}

// Charger les détails du morceau sur track_detail.html
function loadTrackDetails() {
    const trackIndex = getTrackIndex();
    const track = tracks[trackIndex];

    if (track) {
        document.getElementById("track-title").textContent = track.title;
        document.getElementById("track-artist").textContent = "Artiste : " + track.artist;
        document.getElementById("audio-source").src = track.file;
        document.getElementById("audio-player").load();
    }
}

// Contrôles audio
function changeSpeed(speed) {
    const audio = document.getElementById("audio-player");
    audio.playbackRate = speed;
    console.log("Vitesse changée à: " + speed);
}

function skip(seconds) {
    const audio = document.getElementById("audio-player");
    audio.currentTime += seconds;
    console.log("Nouvelle position: " + audio.currentTime + " secondes");
}

function playAudio() {
    const audio = document.getElementById("audio-player");
    audio.play();
    console.log("Lecture en cours");
}

function pauseAudio() {
    const audio = document.getElementById("audio-player");
    audio.pause();
    console.log("Lecture en pause");
}

// Afficher la liste des morceaux si on est sur tracks.html
if (window.location.pathname.includes("tracks.html")) {
    displayTrackList();
}

// Charger les détails si on est sur track_detail.html
if (window.location.pathname.includes("track_detail.html")) {
    loadTrackDetails();
}
