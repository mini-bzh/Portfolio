 // Fonction pour définir un cookie avec une durée d'expiration
 function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Fonction pour obtenir la valeur d'un cookie
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    let cookie = cookieArray[0];
        
    return cookie.substring(cookieName.length, cookie.length);
}


function toggleDarkMode() {
    const body = document.body;
    const modeToggle = document.getElementById('modeToggle');
    const themeLabel = document.getElementById('themeLabel');

    if (modeToggle.checked) {
        body.classList.add('dark-mode');
        setCookie('theme', 'dark', 30); // Définir le cookie avec une durée d'expiration de 30 jours
    } else {
        body.classList.remove('dark-mode');
        setCookie('theme', 'light', 30); // Définir le cookie avec une durée d'expiration de 30 jours
    }
}

// Vérifier le cookie au chargement de la page et appliquer le thème en conséquence
window.onload = function() {
    const savedTheme = getCookie('theme');
    const modeToggle = document.getElementById('modeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        modeToggle.checked = false;
    }
};
