AFRAME.registerComponent('jump-controls', {
  init: function () {
    console.log("Le composant jump-controls a été initialisé.");
    const el = this.el;
    let isJumping = false;
    const jumpSpeed = 0.1; // Vitesse de saut (ajustez selon vos besoins)
    const gravity = 0.05; // Gravité (ajustez selon vos besoins)
    let jumpHeight = 0; // Hauteur de saut

    // Fonction pour détecter la touche de saut enfoncée
    const onKeyDown = function (event) {
      console.log("Touche enfoncée: ", event.code);
      if ((event.code === 'Space' || event.code === 'KeyA') && !isJumping) { // Si la touche Espace ou A est enfoncée et le joueur ne saute pas déjà
        console.log("Démarrage du saut.");
        isJumping = true;
        jumpHeight = 0;
        el.object3D.position.y += 0.05; // Éviter que le joueur ne traverse le sol lors du saut
      }
    };

    // Fonction pour détecter la touche de saut relâchée
    const onKeyUp = function (event) {
      console.log("Touche relâchée: ", event.code);
      if (event.code === 'Space' || event.code === 'KeyA') { // Si la touche Espace ou A est relâchée
        console.log("Fin du saut.");
        isJumping = false;
      }
    };

    // Ajout des gestionnaires d'événements
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Suppression des gestionnaires d'événements lorsque le composant est démonté (c'est-à-dire lorsque l'entité est supprimée)
    this.el.addEventListener('componentremoved', function (event) {
      if (event.detail.name === 'jump-controls') {
        console.log("Le composant jump-controls a été supprimé.");
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
      }
    });

    // Mettre à jour le saut à chaque trame
    el.sceneEl.addEventListener('tick', function () {
      if (isJumping) {
        if (jumpHeight < 1) { // Hauteur maximale du saut (ajustez selon vos besoins)
          jumpHeight += jumpSpeed;
          el.object3D.position.y += jumpSpeed;
        } else {
          isJumping = false;
        }
      } else {
        if (el.object3D.position.y > 1.6) { // Hauteur de la caméra par défaut (ajustez selon vos besoins)
          el.object3D.position.y -= gravity; // Appliquer la gravité
        } else {
          el.object3D.position.y = 1.6;
        }
      }
    });
  }
});