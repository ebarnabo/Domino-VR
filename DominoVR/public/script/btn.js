// Sélectionnez les boutons par leur ID
const buttonGame = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const pauseButton = document.getElementById('pauseButton');
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
    selectedTexture = "/img/textures/snow.jpg";
}


// Sons joués sur les boutons (uniquement après interaction utilisateur - politique autoplay)
let audioUnlocked = false;
function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    const hoverSnd = document.getElementById('hoverSound');
    const clickSnd = document.getElementById('clickSound');
    if (hoverSnd) try { hoverSnd.play().then(() => hoverSnd.pause()); } catch (e) {}
    if (clickSnd) try { clickSnd.play().then(() => clickSnd.pause()); } catch (e) {}
}
document.addEventListener('click', unlockAudio, { once: true, capture: true });
document.addEventListener('touchstart', unlockAudio, { once: true, capture: true });

document.querySelectorAll('.btn-menu').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (window.isSoundEnabled && audioUnlocked) {
            const snd = document.getElementById('hoverSound');
            if (snd) try { snd.play(); } catch (e) {}
        }
    });
    button.addEventListener('click', (e) => {
        unlockAudio();
        if (window.isSoundEnabled) {
            const snd = document.getElementById('clickSound');
            if (snd) try { snd.play(); } catch (e) {}
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

// Bouton 2 - Options
button2.addEventListener('click', () => {
    const texturePaths = [
        '/img/textures/snow.jpg',
        '/img/textures/slime.jpg',
        '/img/textures/gold.jpg',
        '/img/textures/Grass03 header.jpg',
        '/img/textures/Concrete Panel 1 header.jpg',
        '/img/textures/Granite Wall Tiles 1.jpg',
        '/img/textures/Pavement 24 1.8x1.8m.jpg',
        '/img/textures/Regular Pavement 20 header.jpg',
    ];

    const models = [
        { id: 'dojo.glb', name: 'Dojo' },
        { id: 'skybox.glb', name: 'Skybox' },
        { id: 'park.glb', name: 'Park' },
        { id: 'island.glb', name: 'Island' },
        { id: 'bernabeu.glb', name: 'Bernabeu' },
    ];

    let textureOptions = texturePaths.map(t => `
        <div class="swiper-slide">
            <div><img height="100" width="100" src="${t}" alt="Texture" onerror="this.style.background='#333'"></div>
            <div><button class="select-texture btn-primary" data-texture="${t}">Valider la texture</button></div>
        </div>`).join('');

    let modelOptions = models.map((m, index) => `
        <div class="swiper-slide">
            <div><img height="100" width="100" src="/img/model/${m.id.replace('.glb', '.png')}" alt="${m.name}" onerror="this.style.background='#333'"></div>
            <div>
                <select id="modelScale-${index}" class="model-scale-select">
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                </select>
            </div>
            <div><button class="select-model btn-primary" data-model="/assets/${m.id}" data-index="${index}">Valider le terrain</button></div>
        </div>`).join('');
    
    Swal.fire({
        title: 'Options du jeu',
        background: '#030637',
        customClass: { title: 'title-class' },
        html: `
            <p class='txt_white'>Choisissez texture des dominos et terrain.</p>
            <div><p class="title-class">Son :</p>
                <button id="soundOnButton" class="btn-menu" style="margin-right: 5px;">Oui</button>
                <button id="soundOffButton" class="btn-menu">Non</button>
            </div>
            <hr>
            <p class="title-class">Texture des dominos :</p>
            <div class="swiper-container" id="texture-slider">
                <div class="swiper-wrapper">${textureOptions}</div>
                <div class="swiper-button-next" id="texture-slider-next"></div>
                <div class="swiper-button-prev" id="texture-slider-prev"></div>
            </div>
            <hr>
            <p class="title-class">Terrain (dojo) :</p>
            <div class="swiper-container" id="model-slider">
                <div class="swiper-wrapper">${modelOptions}</div>
                <div class="swiper-button-next" id="model-slider-next"></div>
                <div class="swiper-button-prev" id="model-slider-prev"></div>
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
                Swal.close();
            });
            new Swiper('#texture-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: { nextEl: '#texture-slider-next', prevEl: '#texture-slider-prev' },
            });
            new Swiper('#model-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: { nextEl: '#model-slider-next', prevEl: '#model-slider-prev' },
            });
            document.querySelectorAll('.select-texture').forEach(btn => {
                btn.addEventListener('click', () => {
                    selectedTexture = btn.dataset.texture;
                    localStorage.setItem('selectedTexture', selectedTexture);
                    console.log("Texture : " + selectedTexture);
                    Swal.close();
                });
            });
            document.querySelectorAll('.select-model').forEach(btn => {
                btn.addEventListener('click', () => {
                    const model = btn.dataset.model;
                    const idx = btn.getAttribute('data-index');
                    const scaleSel = document.querySelector(`#modelScale-${idx}`);
                    const scale = scaleSel ? scaleSel.value : '1';
                    localStorage.setItem('stageModel', model);
                    localStorage.setItem('modelScale', scale);
                    console.log("Terrain : " + model + " scale " + scale);
                    Swal.close();
                });
            });
        }
    }).then(() => {
        if (pauseButton) pauseButton.blur();
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
