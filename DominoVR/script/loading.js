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
                  if (localStorage.getItem('selectedTexture') ){
                    dominoElement.setAttribute('material', `src: ${localStorage.getItem('selectedTexture') }`);
                  }
                  else{
                    dominoElement.setAttribute('material', `src: ${selectedTexture}`);
                  }
                }
            }
        }        
    }

    function updateModel() {

                  if (localStorage.getItem('stageModel') ){
                    document.getElementById('dojo').setAttribute('gltf-model', `${localStorage.getItem('stageModel') }`);
                  }
                }


    
    

    function showGameUI() {
        console.log('Afficher les éléments de l\'UI du jeu');
        console.log("GO : Texture chargée : "+ selectedTexture);
        playerinfos.classList.remove('hide');
        btnmenu.classList.remove('hide');
        pauseButton.classList.remove('hide');
        updateDominoTextures();
        updateModel();
        
        
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
            // Si aucun modèle 3D à charger, procéder immédiatement à afficher l'UI du jeu
            setTimeout(() => { // Utiliser un timeout pour s'assurer que les transitions CSS se complètent
                loadingBar.classList.add('hide');
                loadingProgress.classList.add('hide');
                showGameUI();
            }, 100); // Délai court pour assurer la transition
        } else {
            console.log('Chargement des modèles 3D en cours...');
            // Gérer le chargement des modèles 3D
            models.forEach(function(model) {
                model.addEventListener('model-loaded', function() {
                    loadedModels++;
                    console.log('Modèle chargé. Nombre total de modèles chargés :', loadedModels);
                    if (loadedModels >= totalModels) {
                        // Une fois tous les modèles chargés, cacher la barre de chargement et afficher l'UI du jeu
                        console.log('Tous les modèles 3D sont chargés. Affichage de l\'UI du jeu.');
                        loadingBar.classList.add('hide');
                        loadingProgress.classList.add('hide');
                        showGameUI();
                    }
                });
            });
        }///
        showGameUI();
    });
});
