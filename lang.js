// Dictionnaire des traductions
const translations = {
    fr: {
        home: "🏠 Accueil",
        tracks: "🎵 Morceaux",
        map: "🗺 Carte",
        select_track: "Sélectionnez un morceau pour voir ses détails.",
        play: "Jouer",
        track_title: "Titre du morceau",
        track_artist: "Artiste",
        player_error: "Votre navigateur ne supporte pas l'audio."
    },
    en: {
        home: "🏠 Home",
        tracks: "🎵 Tracks",
        map: "🗺 Map",
        select_track: "Select a track to see its details.",
        play: "Play",
        track_title: "Track Title",
        track_artist: "Artist",
        player_error: "Your browser does not support audio playback."
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    
    // Modifier les textes
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        element.textContent = translations[lang][key];
    });

    // Modifier le titre du morceau si on est sur la page de détail
    if (document.getElementById("track-title")) {
        document.getElementById("track-title").textContent = translations[lang]["track_title"];
        document.getElementById("track-artist").textContent = translations[lang]["track_artist"];
        document.getElementById("audio-player").innerHTML = `<source id="audio-source" src="" type="audio/mp3">${translations[lang]["player_error"]}`;
    }
}

// Appliquer la langue sauvegardée au chargement
document.addEventListener("DOMContentLoaded", function() {
    let savedLang = localStorage.getItem("language") || "fr";
    document.getElementById("language-selector").value = savedLang;
    changeLanguage(savedLang);
});

// Changer la langue au changement du sélecteur
document.getElementById("language-selector").addEventListener("change", function() {
    changeLanguage(this.value);
});
