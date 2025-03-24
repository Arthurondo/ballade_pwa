// Fichier: language-switcher.js

// Dictionnaire de traductions
const translations = {
  'fr': {
    'welcome': 'Bienvenue sur le site de musique',
    'discover': 'Découvrez et écoutez vos morceaux préférés.',
    'home': 'Accueil',
    'music': 'Musiques',
    'map': 'Carte',
    'listen': 'Écouter',
    'about': 'À propos'
  },
  'en': {
    'welcome': 'Welcome to the music site',
    'discover': 'Discover and listen to your favorite tracks.',
    'home': 'Home',
    'music': 'Music',
    'map': 'Map',
    'listen': 'Listen',
    'about': 'About'
  },
  'es': {
    'welcome': 'Bienvenido al sitio de música',
    'discover': 'Descubre y escucha tus pistas favoritas.',
    'home': 'Inicio',
    'music': 'Música',
    'map': 'Mapa',
    'listen': 'Escuchar',
    'about': 'Acerca de'
  }
};

// Langue par défaut
let currentLanguage = 'fr';

// Fonction pour changer la langue
function changeLanguage(language) {
  // Mise à jour de la langue actuelle
  currentLanguage = language;
  
  // Sauvegarde du choix de langue dans localStorage
  localStorage.setItem('preferredLanguage', language);
  
  // Mise à jour de tous les éléments avec attribut data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[language] && translations[language][key]) {
      element.innerHTML = translations[language][key];
    }
  });
  
  // Mise à jour des attributs placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[language] && translations[language][key]) {
      element.setAttribute('placeholder', translations[language][key]);
    }
  });
  
  // Mise à jour de l'attribut title
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    if (translations[language] && translations[language][key]) {
      element.setAttribute('title', translations[language][key]);
    }
  });
}

// Initialisation: récupérer la langue préférée du navigateur ou du localStorage
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si une langue a été sauvegardée
  const savedLanguage = localStorage.getItem('preferredLanguage');
  
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  } else {
    // Utiliser la langue du navigateur si disponible
    const browserLanguage = navigator.language.split('-')[0];
    if (translations[browserLanguage]) {
      currentLanguage = browserLanguage;
    }
  }
  
  // Initialiser le sélecteur de langue
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.value = currentLanguage;
    languageSelector.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  }
  
  // Appliquer la langue initiale
  changeLanguage(currentLanguage);
});
