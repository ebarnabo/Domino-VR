// Sélectionnez les boutons par leur ID
const buttonGame = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const pauseButton = document.getElementById('pauseButton');
const pauseButton2 = document.getElementById('pauseButton2'); 
var jouerBtn = document.getElementById('button1');
var scene = document.getElementById('vrscene');
var menu = document.getElementById("menu");
var playerinfos = document.getElementById("playerInfo");
var btnmenu = document.getElementById("menuingame");

let selectedTexture; // Déclaration sans valeur initiale

// Vérifier si une valeur est stockée dans le localStorage et qu'elle n'est pas vide
if (localStorage.getItem('selectedTexture') && localStorage.getItem('selectedTexture').trim() !== '') {
    selectedTexture = localStorage.getItem('selectedTexture');
} else {
    selectedTexture = "img/textures/snow.jpg"; // Utiliser la valeur par défaut si aucune valeur valide n'est trouvée
}


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
    'img/textures/snow.jpg',
    'img/textures/slime.jpg',
    'img/textures/gold.jpg',
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
    const textures = [
        'img/textures/snow.jpg',
        'img/textures/slime.jpg',
        'img/textures/gold.jpg',
        'img/textures/Grass03 header.jpg',
        'img/textures/Concrete Panel 1 header.jpg',
        'img/textures/Granite Wall Tiles 1.jpg',
        'img/textures/Pavement 24 1.8x1.8m.jpg',
        'img/textures/Regular Pavement 20 header.jpg',
    ];

    const models = [
        'dojo.glb',
        'skybox.glb',
        'park.glb',
        'island.glb',
        'bernabeu.glb',
    ];

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

    let modelOptions = '';
    models.forEach((model, index) => {
        modelOptions += `
        <div class="swiper-slide">
            <div>
                <img height="100px" width="100px" src="img/model/${model.replace('.glb', '.png')}" alt="Modèle 3D">
            </div>
            <div>
                <select id="modelScale-${index}" class="model-scale-select">
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                </select>
            </div>
            <div>
                <button class="select-model btn-primary" data-model="assets/${model}" data-index="${index}">Valider le modèle 3D</button>
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
            </ul>
            <hr>
            <div class="swiper-container" id="texture-slider">
            <div class="swiper-wrapper">${textureOptions}</div>
            <div class="swiper-button-next" id="texture-slider-next"></div>
            <div class="swiper-button-prev" id="texture-slider-prev"></div>
        </div>
            <div class="swiper-container" id="model-slider">
                <div class="swiper-wrapper">${modelOptions}</div>
                <div class="swiper-button-next" id="model-slider-next"></div>
                <div class="swiper-button-prev" id="model-slider-prev"></div>
            </div>
            <hr>


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

    // Ajout des boutons de navigation uniques pour chaque slider
    const textureSwiper = new Swiper('#texture-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '#texture-slider-next',
            prevEl: '#texture-slider-prev',
        },
    });
    
    const modelSwiper = new Swiper('#model-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '#model-slider-next',
            prevEl: '#model-slider-prev',
        },
    });
    
    // Écouteur d'événement pour les boutons de sélection de texture
    document.querySelectorAll('.select-texture').forEach(button => {
        button.addEventListener('click', () => {
            selectedTexture = button.dataset.texture;
            console.log("Texture chargée : " + selectedTexture);
            // Sauvegarde dans le localStorage
            localStorage.setItem('selectedTexture', selectedTexture);
        });
    });

    document.querySelectorAll('.select-model').forEach(button => {
        button.addEventListener('click', () => {
            const selectedModel = button.dataset.model;
            const modelIndex = button.getAttribute('data-index');
            // Supposons que vous avez un sélecteur d'échelle pour chaque modèle
            const scaleSelector = document.querySelector(`#modelScale-${modelIndex}`);
            const selectedScale = scaleSelector ? scaleSelector.value : "1 1 1"; // Utilisez la valeur du sélecteur s'il existe
    
            console.log("Modèle 3D chargé : " + selectedModel + " avec scale : " + selectedScale);
            localStorage.setItem('stageModel', selectedModel);
            localStorage.setItem('modelScale', selectedScale); // Stockez l'échelle sélectionnée
            Swal.close();
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const selectedModel = localStorage.getItem('stageModel');
        const selectedScale = localStorage.getItem('modelScale') || "1 1 1"; // Fournir une valeur par défaut
    
        // Appliquer le modèle et le scale à l'entité
        const entity = document.querySelector('#dojo'); // Assurez-vous que l'ID correspond à votre entité
        if (entity) {
            if (selectedModel) {
                entity.setAttribute('gltf-model', `url(${selectedModel})`);
            }
            entity.setAttribute('scale', selectedScale);
        }
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
                <li class='txt_white'><strong>Equipe du projet:</strong></li>
                <li class='txt_primary'>Jorane Duhamel</li>
                <li class='txt_white'>Edwin Barnabot</li>
                <li class='txt_primary'>Tedrice Barvaut</li>
            </ul>
            <p class='txt_white'>Merci d'avoir joué à notre jeu !</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer',
    });
});

// Fonction pour gérer la pause
const handlePause = () => {
    Swal.fire({
        html: `
            <div style="text-align: center;">
                <h1 class="txt_white">Pause</h1>
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
                menu.classList.remove("hide");
                playerinfos.classList.add("hide");
                btnmenu.classList.add("hide");
                scene.classList.add("hide");
                Swal.close();
            });
        }
    }).then(() => {
        pauseButton.blur();
    });
};

// Écouteur d'événements pour pauseButton
pauseButton.addEventListener('click', handlePause);

// Écouteur d'événements pour pauseButton2
//pauseButton2.addEventListener('click', handlePause);



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
