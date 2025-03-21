document.addEventListener("DOMContentLoaded", function () {
    let selectedTrack = JSON.parse(localStorage.getItem("selectedTrack"));

    // Mise à jour des détails du morceau
    if (selectedTrack) {
        document.getElementById("track-title").textContent = selectedTrack.title;
        document.getElementById("track-description").textContent = selectedTrack.description;
        document.getElementById("audio-source").src = selectedTrack.file;
        
        let audioPlayer = document.getElementById("audio-player");
        audioPlayer.load();  // Recharge le fichier audio
    }
});

// Fonctions pour contrôler l'audio
function playAudio() {
    document.getElementById("audio-player").play();
}

function pauseAudio() {
    document.getElementById("audio-player").pause();
}

function rewindAudio() {
    let audio = document.getElementById("audio-player");
    audio.currentTime = Math.max(0, audio.currentTime - 5);
}

function forwardAudio() {
    let audio = document.getElementById("audio-player");
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
}

function changeSpeed() {
    let audio = document.getElementById("audio-player");
    let speed = document.getElementById("speed-control").value;
    audio.playbackRate = speed;
}
