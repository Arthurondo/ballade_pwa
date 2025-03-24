document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio-player");
    const playPauseButton = document.getElementById("play-pause");
    const forwardButton = document.getElementById("forward");
    const backwardButton = document.getElementById("backward");

    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    forwardButton.addEventListener("click", () => {
        audio.currentTime += 10;
    });

    backwardButton.addEventListener("click", () => {
        audio.currentTime -= 10;
    });

    const params = new URLSearchParams(window.location.search);
    const track = params.get("track");
    if (track) {
        document.getElementById("audio-source").src = "music/" + track;
        audio.load();
    }
});
