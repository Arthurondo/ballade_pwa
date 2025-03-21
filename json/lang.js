const translations = {
    fr: {
        title: "Ballade - Musique Éducative",
        "library-title": "Bibliothèque Musicale",
        "player-title": "Lecteur Audio",
        track1: "Morceau 1",
        track2: "Morceau 2"
    },
    en: {
        title: "Ballade - Educational Music",
        "library-title": "Music Library",
        "player-title": "Audio Player",
        track1: "Track 1",
        track2: "Track 2"
    }
};

document.getElementById("language-selector").addEventListener("change", (event) => {
    const lang = event.target.value;
    changeLanguage(lang);
});

function changeLanguage(lang) {
    document.getElementById("title").textContent = translations[lang]["title"];
    document.getElementById("library-title").textContent = translations[lang]["library-title"];
    document.getElementById("player-title").textContent = translations[lang]["player-title"];

    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        element.textContent = translations[lang][key];
    });
}

// Détecte la langue du navigateur
const userLang = navigator.language.startsWith("fr") ? "fr" : "en";
document.getElementById("language-selector").value = userLang;
changeLanguage(userLang);
