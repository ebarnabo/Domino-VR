// Sélectionnez les boutons par leur ID
const buttonGame = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const pauseButton = document.getElementById('pauseButton'); // Assurez-vous que l'ID correspond
let selectedTexture="img/textures/Grass03 header.jpg";  


// Son jouées sur les boutons
document.querySelectorAll('.btn-menu').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (window.isSoundEnabled) {
            document.getElementById('hoverSound').play();
        }
    });
    button.addEventListener('click', () => {
        if (window.isSoundEnabled) {
            document.getElementById('clickSound').play();
        }
    });
});

// Bouton 1
buttonGame.addEventListener('click', () => {
    Swal.fire({
        title: `Vous êtes le Joueur ${playerID}`,
        timer: 2000,
        showConfirmButton: false,
    });
});

// Bouton 2
// Liste des fichiers textures disponibles
const textures = [
    'img/textures/Grass03 header.jpg',
    'img/textures/Concrete Panel 1 header.jpg',
    'img/textures/Granite Wall Tiles 1.jpg',
    'img/textures/Pavement 24 1.8x1.8m.jpg',
    'img/textures/Regular Pavement 20 header.jpg',
];

// Variable globale pour stocker la texture sélectionnée
    selectedTexture = textures[0]; // Par défaut, on choisit la première texture

// Bouton 2
button2.addEventListener('click', () => {
    let textureOptions = '';
    textures.forEach(texture => {
        textureOptions += `
        <div class="swiper-slide">
            <div>
                <img height="100px" width="100px" src="${texture}" alt="Texture">
            </div>
            <div>
                <button class="select-texture btn-primary" data-texture="${texture}">Valider la texture</button>
            </div>
        </div>`;
    });

    Swal.fire({
        title: 'Options du jeu',
        background: '#030637',
        customClass: {
            title: 'title-class',
        },
        html: `
            <p class='txt_white'>Choisissez vos préférences pour une meilleure expérience de jeu.</p>
            <ul>
                <div>
                    <p class="title-class">Son du jeu :</p>
                    <button id="soundOnButton" class="swal2-confirm swal2-styled btn-menu" style="margin-right: 5px;">Oui <i class="fa-solid fa-volume-high" style="color: #ffffff;"></i></button>
                    <button id="soundOffButton" class="swal2-cancel swal2-styled btn-menu">Non <i class="fa-solid fa-volume-xmark" style="color: #ffffff;"></i></button>
                </div>
                <li class='txt_white'>Difficulté: <select><option>Facile</option><option>Normal</option><option>Difficile</option></select></li>
            </ul>
            <hr>
            <div class="swiper-container">
                <div class="swiper-button-next"></div>
                <div class="swiper-wrapper">${textureOptions}</div>
                <div class="swiper-button-prev"></div>
            </div>
        `,
        showConfirmButton: true,
        didOpen: () => {
            document.getElementById('soundOnButton').addEventListener('click', () => {
                window.isSoundEnabled = true;
                Swal.close();
            });
            document.getElementById('soundOffButton').addEventListener('click', () => {
                window.isSoundEnabled = false;
                // Assurez-vous d'implémenter la fonction mutePage si nécessaire
                Swal.close();
            });
            document.getElementById('resumeGame').addEventListener('click', () => {
                Swal.close();
            });
            document.getElementById('backToMenu').addEventListener('click', () => {
                // Logique pour retourner au menu principal
                Swal.close();
            });
        }
    }).then(() => {
        pauseButton.blur();
    });
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    // Écouteur d'événement pour les boutons de sélection de texture
    document.querySelectorAll('.select-texture').forEach(button => {
        button.addEventListener('click', () => {
            selectedTexture = button.dataset.texture;
              console.log("Texture chargée : "+ selectedTexture);
        });
    });
});


// bouton 3
button3.addEventListener('click', () => {
    Swal.fire({
        title: 'Crédits du jeu',
        background: '#030637',
        customClass: {
            title: 'title-class',
            content: 'content-class',
        },
        html: `
            <p class='txt_white'>Développé par l'équipe DominoVR</p>
            <ul>
                <li class='txt_white'><strong>Game Design:</strong> Edwin Barnabot</li>
                <li class='txt_white'><strong>Développement:</strong> Jorane Duhamel</li>
                <li class='txt_white'><strong>Art et Graphismes:</strong> Edwin Barnabot</li>
                <li class='txt_white'><strong>Musique et Sons:</strong> Tedrice Barvaut</li>
            </ul>
            <p class='txt_white'>Merci d'avoir joué à notre jeu !</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer',
    });
});

pauseButton.addEventListener('click', () => {
    Swal.fire({
        title: "Pause",
        html: `
            <div style="text-align: center;">
                <h3 class="title-class txt_primary">Le jeu est en pause</h3>
                <p class="title-class">Son du jeu :</p>
                <div>
                    <button id="soundOnButton" class="swal2-confirm swal2-styled btn-menu" style="margin-right: 5px;">Oui <i class="fa-solid fa-volume-high" style="color: #ffffff;"></i></button>
                    <button id="soundOffButton" class="swal2-cancel swal2-styled btn-menu">Non <i class="fa-solid fa-volume-xmark" style="color: #ffffff;"></i></button>
                </div>
                <div style="margin-top: 10px;">
                    <button id="resumeGame" class="btn-menu btn-primary">Reprendre <i class="fa-solid fa-play" style="color: #ffffff;"></i></button>
                </div>
                <div style="margin-top: 10px;">
                    <button id="backToMenu" class="btn-menu title-class">Menu principal <i class="fa-solid fa-circle-xmark" style="color: #db004d;"></i></button>
                </div>
            </div>
        `,
        background: '#030637',
        showConfirmButton: false,
        showCancelButton: false,
        didOpen: () => {
            document.getElementById('soundOnButton').addEventListener('click', () => {
                window.isSoundEnabled = true;
                Swal.close();
            });
            document.getElementById('soundOffButton').addEventListener('click', () => {
                window.isSoundEnabled = false;
                // Assurez-vous d'implémenter la fonction mutePage si nécessaire
                Swal.close();
            });
            document.getElementById('resumeGame').addEventListener('click', () => {
                Swal.close();
            });
            document.getElementById('backToMenu').addEventListener('click', () => {
                // Logique pour retourner au menu principal
                Swal.close();
            });
        }
    }).then(() => {
        pauseButton.blur();
    });
});

function mutePage() {
    document.querySelectorAll("video, audio").forEach(elem => {
        elem.muted = true;
    });
}

// Effet bouncy pour les icônes des boutons
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-menu").forEach(btnMenu => {
        var icon = btnMenu.querySelector("i");
        btnMenu.addEventListener("mouseenter", () => {
            if (icon) { icon.classList.add("fa-bounce"); }
        });
        btnMenu.addEventListener("mouseleave", () => {
            if (icon) { icon.classList.remove("fa-bounce"); }
        });
    });
});
