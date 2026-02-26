partieEncours = "1"; 
console.log("Partie en cours : "+partieEncours);   

document.addEventListener('DOMContentLoaded', function() {
    var jouerBtn = document.getElementById('button1');
    var sceneEl = document.getElementById('vrscene');
    var menu = document.getElementById("menu");
    var playerinfos = document.getElementById("playerInfo");
    var btnmenu = document.getElementById("menuingame");
    var pauseButton = document.getElementById("pauseButton"); 

    function hideInitialUI() {
        console.log('Masquer le menu principal et autres éléments UI initiaux');
        menu.classList.add('hide');
        playerinfos.classList.add('hide'); // Initialement masqué jusqu'à ce que le jeu soit chargé
        btnmenu.classList.add('hide'); // Le menu in-game reste caché jusqu'à ce que le jeu soit chargé
    }
    function updateDominoTextures() {
        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                let dominoId = `domino-${i}${j}`;
                let dominoElement = document.getElementById(dominoId);
                if (dominoElement) {  
                  const tex = localStorage.getItem('selectedTexture') || (typeof selectedTexture !== 'undefined' ? selectedTexture : '/img/textures/snow.jpg');
                  const texPath = (tex && tex.startsWith('/')) ? tex : '/' + (tex || 'img/textures/snow.jpg').replace(/^\//, '');
                  dominoElement.setAttribute('material', `src: url(${texPath})`);
                }
            }
        }        
    }

    function updateModel() {
        const dojoEl = document.getElementById('dojo');
        if (!dojoEl) return;
        const stageModel = localStorage.getItem('stageModel');
        const modelScale = localStorage.getItem('modelScale') || '1';
        if (stageModel) {
            const path = stageModel.startsWith('/') ? stageModel : '/' + stageModel;
            dojoEl.setAttribute('gltf-model', `url(${path})`);
        }
        const scale = modelScale.includes(' ') ? modelScale : `${modelScale} ${modelScale} ${modelScale}`;
        dojoEl.setAttribute('scale', scale);
    }


    
    

    function showGameUI() {
        console.log('Afficher les éléments de l\'UI du jeu');
        console.log("GO : Texture chargée : "+ selectedTexture);
        playerinfos.classList.remove('hide');
        btnmenu.classList.remove('hide');
        pauseButton.classList.remove('hide');
        updateDominoTextures();
        updateModel();
    }

    function registerPositionOnEnterVR() {
        if (AFRAME.components['position-on-enter-vr']) return; // Déjà enregistré
        AFRAME.registerComponent('position-on-enter-vr', {
          init: function () {
            var el = this.el;
            
            el.addEventListener('enter-vr', function () {
              // Mettre à jour la position lorsque le mode VR est activé
              el.setAttribute('position', '0 0 0'); // Remplacez les valeurs par celles que vous souhaitez
            });
      
            el.addEventListener('exit-vr', function () {
              // Réinitialiser la position lorsque le mode VR est quitté (optionnel)
              el.setAttribute('position', '0 0 0'); // Remplacez les valeurs par celles que vous souhaitez
            });
          }
        });
    }

    // Enregistrer le composant position-on-enter-vr au chargement
    if (typeof AFRAME !== 'undefined') {
        registerPositionOnEnterVR();
    }

    jouerBtn.addEventListener('click', function() {
        console.log('Bouton JOUER cliqué');
        hideInitialUI(); // Masquer immédiatement le menu principal et d'autres éléments

        // Rendre la scène A-Frame visible pour commencer le chargement
        sceneEl.classList.remove('hide');

        var models = sceneEl.querySelectorAll('[gltf-model]');
        console.log('Nombre total de modèles trouvés dans la scène :', models.length);

        var totalModels = models.length;
        var loadedModels = 0;

        if (totalModels === 0) {
            console.log('Aucun modèle 3D à charger. Affichage immédiat de l\'UI du jeu.');
            setTimeout(() => {
                const loadingBar = document.getElementById('loadingBar');
                const loadingProgress = document.getElementById('loadingProgress');
                if (loadingBar) loadingBar.classList.add('hide');
                if (loadingProgress) loadingProgress.classList.add('hide');
                showGameUI();
            }, 100);
        } else {
            console.log('Chargement des modèles 3D en cours...');
            models.forEach(function(model) {
                model.addEventListener('model-loaded', function() {
                    loadedModels++;
                    console.log('Modèle chargé. Nombre total de modèles chargés :', loadedModels);
                    if (loadedModels >= totalModels) {
                        console.log('Tous les modèles 3D sont chargés. Affichage de l\'UI du jeu.');
                        const loadingBar = document.getElementById('loadingBar');
                        const loadingProgress = document.getElementById('loadingProgress');
                        if (loadingBar) loadingBar.classList.add('hide');
                        if (loadingProgress) loadingProgress.classList.add('hide');
                        showGameUI();
                    }
                });
            });
        }
    });
});
