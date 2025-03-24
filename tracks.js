document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio-player");
    const playPauseButton = document.getElementById("play-pause");
    const forwardButton = document.getElementById("forward");
    const backwardButton = document.getElementById("backward");
    const loopButton = document.getElementById("loop");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const durationDisplay = document.getElementById("duration");
    const speedControl = document.getElementById("speed-control");

    let isLooping = false;

    /** 🎵 Play / Pause */
    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerText = "⏸ Pause";
        } else {
            audio.pause();
            playPauseButton.innerText = "▶️ Play";
        }
    });

    /** ⏩ Avancer de 10s */
    forwardButton.addEventListener("click", () => {
        audio.currentTime += 10;
    });

    /** ⏪ Reculer de 10s */
    backwardButton.addEventListener("click", () => {
        audio.currentTime -= 10;
    });

    /** 🔁 Activer/Désactiver la boucle */
    loopButton.addEventListener("click", () => {
        isLooping = !isLooping;
        audio.loop = isLooping;
        loopButton.style.color = isLooping ? "green" : "black";
    });

    /** 📶 Mettre à jour la barre de progression */
    audio.addEventListener("timeupdate", () => {
        if (!isNaN(audio.duration)) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
    });

    /** 🕒 Mettre à jour la durée totale */
    audio.addEventListener("loadedmetadata", () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    /** 🔄 Changer la position de la lecture */
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    /** ⚡ Modifier la vitesse de lecture */
    speedControl.addEventListener("input", () => {
        audio.playbackRate = speedControl.value;
    });

    /** ⏳ Fonction pour formater le temps (mm:ss) */
    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
});
