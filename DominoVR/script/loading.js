document.addEventListener('DOMContentLoaded', function() {
    var jouerBtn = document.getElementById('button1'); // Bouton pour commencer le jeu
    var sceneEl = document.getElementById('vrscene'); // L'élément de la scène A-Frame
    var loadingBar = document.getElementById('loading-bar'); // La barre de chargement
    var loadingProgress = document.getElementById('loading-progress'); // La progression de la barre de chargement

    jouerBtn.addEventListener('click', function() {
        console.log('Bouton JOUER cliqué');
        // Afficher la barre de chargement
        loadingBar.classList.remove('hide');
        loadingProgress.classList.remove('hide');
        console.log('Barre de chargement affichée');

        // Initialiser le chargement de la scène
        sceneEl.classList.remove('hide'); // Rend la scène visible pour démarrer le chargement
        console.log('Scène A-Frame rendue visible');

        var totalModels = sceneEl.querySelectorAll('[gltf-model]').length;
        var loadedModels = 0;
        console.log(`Total de modèles à charger: ${totalModels}`);

        // Vérifier si des modèles 3D doivent être chargés
        if (totalModels > 0) {
            sceneEl.querySelectorAll('[gltf-model]').forEach(function(model) {
                model.addEventListener('model-loaded', function() {
                    loadedModels++;
                    var progressPercentage = (loadedModels / totalModels) * 100;
                    loadingProgress.style.width = progressPercentage + '%';
                    console.log(`Modèle chargé: ${loadedModels}/${totalModels} (${progressPercentage}%)`);
                    if (loadedModels >= totalModels) {
                        console.log('Tous les modèles 3D sont chargés');
                        // Le chargement est terminé
                        loadingBar.classList.add('hide');
                        loadingProgress.classList.add('hide');
                        document.getElementById('menuingame').classList.remove('hide'); // Affiche le menu in-game
                    }
                });
            });
        } else {
            // Si aucune modèle 3D à charger, ajuster directement la largeur de la barre de progression à 100%
            loadingProgress.style.width = '100%';
            console.log('Aucun modèle 3D à charger');
        }

        // Masquage forcé de la barre de chargement après un délai comme mesure de sécurité
        setTimeout(function() {
            console.log('Masquage forcé de la barre de chargement après délai');
            loadingBar.classList.add('hide');
            loadingProgress.classList.add('hide');
            document.getElementById('menuingame').classList.remove('hide'); // Assure l'affichage du menu in-game
        }, 100); // Attendre 10 secondes avant de forcer le masquage
    });
});
