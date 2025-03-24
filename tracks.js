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
    document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio-player");
    const playPauseButton = document.getElementById("play-pause");
    const forwardButton = document.getElementById("forward");
    const backwardButton = document.getElementById("backward");
    const loopButton = document.getElementById("loop");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");

    let isLooping = false;

    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerText = "⏸";
        } else {
            audio.pause();
            playPauseButton.innerText = "▶️";
        }
    });

    forwardButton.addEventListener("click", () => audio.currentTime += 10);
    backwardButton.addEventListener("click", () => audio.currentTime -= 10);

    loopButton.addEventListener("click", () => {
        isLooping = !isLooping;
        audio.loop = isLooping;
        loopButton.style.color = isLooping ? "green" : "black";
    });

    audio.addEventListener("timeupdate", () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});

    let audio = document.getElementById("audio-player");
    let speed = document.getElementById("speed-control").value;
    audio.playbackRate = speed;
}
