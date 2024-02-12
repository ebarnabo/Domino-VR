  document.addEventListener('DOMContentLoaded', function () {
    // Afficher la barre de chargement
    var loadingBar = document.getElementById('loading-bar');
    loadingBar.style.display = 'block';

    var sceneEl = document.querySelector('a-scene');

    // Fonction pour vérifier si tous les modèles sont chargés
    function checkAllModelsLoaded() {
      var allModels = sceneEl.querySelectorAll('[gltf-model]');
      var loadedModels = 0;
      allModels.forEach(function(model) {
        model.addEventListener('model-loaded', function() {
          loadedModels++;
          if (loadedModels === allModels.length) {
            // Tous les modèles sont chargés, masquer la barre de chargement
            loadingBar.style.display = 'none';
          }
        });
      });
    }

    // Attendre que la scène soit chargée pour commencer à vérifier les modèles
    sceneEl.addEventListener('loaded', checkAllModelsLoaded);
  });
