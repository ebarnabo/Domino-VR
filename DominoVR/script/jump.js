AFRAME.registerComponent('jump-controls', {
  init: function () {
      console.log("Le composant jump-controls a été initialisé.");
      const el = this.el;
      let isJumping = false;
      let jumpStartY = 0;
      const jumpHeight = 1.5;
      const gravity = 9.8;
      let jumpStartTime = 0;

      const initialVelocity = Math.sqrt(2 * gravity * jumpHeight);

      // Fonction de gestion des événements de saut
      const startJump = function () {
          if (!isJumping) {
              console.log("Démarrage du saut.");
              isJumping = true;
              jumpStartY = el.object3D.position.y;
              jumpStartTime = performance.now();

              function jumpUpdate(time) {
                  const elapsed = (time - jumpStartTime) / 1000;
                  const displacement = initialVelocity * elapsed - 0.5 * gravity * elapsed * elapsed;
                  el.object3D.position.y = jumpStartY + displacement;

                  if (displacement > 0) {
                      requestAnimationFrame(jumpUpdate);
                  } else {
                      console.log("Fin du saut.");
                      el.object3D.position.y = jumpStartY;
                      isJumping = false;
                  }
              }

              requestAnimationFrame(jumpUpdate);
          }
      };

      // Écouter les touches du clavier et les boutons du contrôleur
      document.addEventListener('keydown', function (event) {
          if (event.code === 'Space') {
              startJump();
          }
      });

      this.el.sceneEl.addEventListener('xbuttondown', startJump); // Pour le bouton Z (X sur Oculus)
      this.el.sceneEl.addEventListener('abuttondown', startJump); // Pour le bouton A

  }
});
