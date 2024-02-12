document.addEventListener('DOMContentLoaded', function() {
    var jouerBtn = document.getElementById('button1'); // Assurez-vous que cet ID correspond à votre bouton Jouer
    var sceneEl = document.getElementById('vrscene');
    var loadingBar = document.getElementById('loading-bar');
    var loadingProgress = document.getElementById('loading-progress');

    jouerBtn.addEventListener('click', function() {
        // Afficher la barre de chargement
        loadingBar.classList.remove('hide');
        loadingProgress.classList.remove('hide');

        // Initialiser le chargement de la scène
        sceneEl.classList.remove('hide'); // Rend la scène visible pour démarrer le chargement

        // Gestion du chargement
        var totalModels = sceneEl.querySelectorAll('[gltf-model]').length;
        var loadedModels = 0;

        if(totalModels === 0) { // Si aucune modèle 3D à charger, masquer directement la barre
            loadingBar.classList.add('hide');
            document.getElementById('menuingame').classList.remove('hide');
        }

        sceneEl.querySelectorAll('[gltf-model]').forEach(function(model) {
            model.addEventListener('model-loaded', function() {
                loadedModels++;
                var progressPercentage = (loadedModels / totalModels) * 100;
                loadingProgress.style.width = progressPercentage + '%';
                if (loadedModels >= totalModels) {
                    // Le chargement est terminé
                    loadingBar.classList.add('hide');
                    loadingProgress.classList.add('hide');
                    document.getElementById('menuingame').classList.remove('hide'); // Affiche le menu in-game
                }
            });
        });
    });
});
