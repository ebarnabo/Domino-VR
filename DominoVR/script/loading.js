partieEncours = "1"; 
console.log("Partie en cours : "+partieEncours);   

document.addEventListener('DOMContentLoaded', function() {
    var jouerBtn = document.getElementById('button1');
    var sceneEl = document.getElementById('vrscene');
    var loadingBar = document.getElementById('loading-bar');
    var loadingProgress = document.getElementById('loading-progress');
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

    function showGameUI() {
        console.log('Afficher les éléments de l\'UI du jeu');
        playerinfos.classList.remove('hide');
        btnmenu.classList.remove('hide');
        pauseButton.classList.remove('hide');
        // Le bouton Pause est déjà inclus dans 'menuingame', donc il sera affiché avec son conteneur
    }

    jouerBtn.addEventListener('click', function() {
        console.log('Bouton JOUER cliqué');
        hideInitialUI(); // Masquer immédiatement le menu principal et d'autres éléments

        // Afficher la barre de chargement
        loadingBar.classList.remove('hide');
        loadingProgress.classList.remove('hide');

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
