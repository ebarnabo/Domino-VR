
import './style.css'



// Sélectionnez les boutons par leur ID
const buttonGame = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const menu = document.getElementById("menu");
const vrgame = document.getElementById("vrscene");

// Ajoutez des gestionnaires d'événements aux boutons
buttonGame.addEventListener('click', () => {
  menu.classList.add("hide");
  vrgame.classList.add("show");
});

button2.addEventListener('click', () => {
  Swal.fire({
    title: 'Options du jeu',
    background: '#030637',
    customClass: {
      title: 'title-class',
    },
    html: `
      <p class ='txt_white'>Choisissez vos préférences pour une meilleure expérience de jeu.</p>
      <ul>
        <li class ='txt_white'>Volume: <input type="range" min="0" max="100"></li>
        <li class ='txt_white'>Résolution: <select><option>1920x1080</option><option>1280x720</option></select></li>
        <li class ='txt_white'>Difficulté: <select><option>Facile</option><option>Normal</option><option>Difficile</option></select></li>
      </ul>
    `,
    icon: 'settings',
    confirmButtonText: 'Appliquer',
    showCancelButton: true,
    cancelButtonText: 'Annuler'
  });
});

button3.addEventListener('click', () => {
  Swal.fire({
    title: 'Crédits du jeu',
    background: '#030637',
    customClass: {
      title: 'title-class',
      content: 'content-class'
    },
    html: `
      <p class ='txt_white'>Développé par l'équipe DominoVR</p>
      <ul>
        <li class ='txt_white'><strong>Game Design:</strong> Edwin Barnabot</li>
        <li class ='txt_white'><strong>Développement:</strong> Jorane Duhamel</li>
        <li class ='txt_white'><strong>Art et Graphismes:</strong> Edwin Barnabot</li>
        <li class ='txt_white'><strong>Musique et Sons:</strong> Tedrice Barvaut</li>
      </ul>
      <p class ='txt_white'>Merci d'avoir joué à notre jeu !</p>
    `,
    icon: 'info',
    confirmButtonText: 'Fermer'
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  const soundToggle = document.getElementById('soundToggle');

  soundToggle.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      soundToggle.textContent = '🔊'; // Icone pour son activé
    } else {
      video.muted = true;
      soundToggle.textContent = '🔇'; // Icone pour son coupé
    }
  });
});
