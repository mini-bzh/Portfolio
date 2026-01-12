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
/*
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.container').forEach(container => {
        const contentOverflows = container.scrollHeight > container.clientHeight;

        if (contentOverflows) {
            // Créer le bouton dynamiquement
            const seeMore = document.createElement('div');
            seeMore.className = 'see-more';
            seeMore.textContent = 'En voir plus';

            // Ajouter l’élément au container
            container.appendChild(seeMore);

            // Gérer le clic
            seeMore.addEventListener('click', () => {
                container.style.maxHeight = 'none';
                seeMore.remove(); // Supprime le bouton une fois déplié
            });
        }
    });
});*/

function animation(toBeAnimated) {
    const images = toBeAnimated.querySelectorAll(".chronologie");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            // quand la section est visible → ajoute la rotation
            images.forEach(img => img.classList.add("rotate"));
        } else {
            // quand la section sort de l’écran → retire la rotation
            images.forEach(img => img.classList.remove("rotate"));
        }
        });
    }, { threshold: 1 }); // déclenche quand 30% est visible

    observer.observe(toBeAnimated);
}

document.addEventListener("DOMContentLoaded", () => {
    animation(document.querySelector("#degree"))
});

document.addEventListener("DOMContentLoaded", () => {
    animation(document.querySelector("#techno"))
});

document.addEventListener("DOMContentLoaded", () => {
    animation(document.querySelector("#tags"))
});



const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const dotsNav = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Crée les petits points
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsNav.appendChild(dot);
});

const dots = Array.from(dotsNav.children);

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

var user_clicked = false;

nextButton.addEventListener('click', () => {goToSlide(currentIndex + 1); user_clicked = true});
prevButton.addEventListener('click', () => {goToSlide(currentIndex - 1); user_clicked = true});
/*
// Défilement automatique (facultatif)
setInterval(() => {
    if (!user_clicked){
        goToSlide(currentIndex + 1);
    } else {user_clicked = false;}
}, 1000); // toutes les 4 secondes*/