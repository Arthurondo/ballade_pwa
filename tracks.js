document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let trackList = document.getElementById("track-list");
            let params = new URLSearchParams(window.location.search);
            let trackTitle = params.get("track");

            if (trackList) {
                // 🎵 Si on est sur `tracks.html`, afficher la liste des morceaux dynamiquement
                trackList.innerHTML = "";
                data.tracks.forEach(track => {
                    let button = document.createElement("button");
                    button.textContent = track.title;
                    button.onclick = () => {
                        window.location.href = `track_detail.html?track=${encodeURIComponent(track.title)}`;
                    };
                    trackList.appendChild(button);
                });
            }

            if (trackTitle) {
                // 🎼 Si on est sur `track_detail.html`, afficher les détails du morceau
                let track = data.tracks.find(t => t.title === trackTitle);
                if (track) {
                    document.getElementById("track-title").textContent = track.title;
                    document.getElementById("audio-source").src = track.file;
                    document.getElementById("audio-player").load();
                    document.getElementById("pdf-viewer").src = `https://drive.google.com/viewerng/viewer?embedded=true&url=${track.pdf}`;
                } else {
                    document.body.innerHTML = "<h1>⚠️ Morceau non trouvé</h1>";
                }
            }

            // 🎧 Gestion des contrôles audio (uniquement sur `track_detail.html`)
            const audio = document.getElementById("audio-player");
            if (audio) {
                document.getElementById("play-pause").addEventListener("click", () => {
                    if (audio.paused) {
                        audio.play();
                        document.getElementById("play-pause").textContent = "⏸ Pause";
                    } else {
                        audio.pause();
                        document.getElementById("play-pause").textContent = "▶️ Play";
                    }
                });

                document.getElementById("forward").addEventListener("click", () => {
                    audio.currentTime += 10;
                });

                document.getElementById("backward").addEventListener("click", () => {
                    audio.currentTime -= 10;
                });
            }
        })
        .catch(error => console.error("Erreur de chargement des morceaux :", error));
});
