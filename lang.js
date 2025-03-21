const translations = {
    fr: {
        home: "🏠 Accueil",
        tracks: "🎵 Morceaux",
        map: "🗺 Carte",
        welcome: "Bienvenue sur notre site musical !",
        intro: "Découvrez une sélection de morceaux et explorez la carte.",
        tracks_list: "Liste des morceaux",
        select_track: "Sélectionnez un morceau pour voir ses détails.",
        track_title: "Titre du morceau",
        track_artist: "Artiste",
        play: "Jouer",
        map_title: "Carte interactive",
        map_desc: "Explorez les emplacements associés aux morceaux."
    },
    en: {
        home: "🏠 Home",
        tracks: "🎵 Tracks",
        map: "🗺 Map",
        welcome: "Welcome to our music site!",
        intro: "Discover a selection of tracks and explore the map.",
        tracks_list: "Track list",
        select_track: "Select a track to see its details.",
        track_title: "Track Title",
        track_artist: "Artist",
        play: "Play",
        map_title: "Interactive Map",
        map_desc: "Explore locations associated with tracks."
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
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
