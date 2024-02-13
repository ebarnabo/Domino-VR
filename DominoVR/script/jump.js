AFRAME.registerComponent('jump-controls', {
    init: function () {
        console.log("Le composant jump-controls a été initialisé.");
        const el = this.el;
        let isJumping = false;
        let jumpCount = 0;
        const jumpHeight = 1.5;
        const gravity = 9.8;
        const groundY = 1; // Définir le niveau du sol, ajustez selon votre scène
        let initialVelocity = Math.sqrt(2 * gravity * jumpHeight);
  
        // Ajouter un élément audio pour le son de saut
        const jumpSound = new Audio('sounds/jump.mp3');
  
        const startJump = function () {
            if (!isJumping || jumpCount < 2) {
                if (!isJumping) {
                    isJumping = true;
                    jumpCount = 1;
                } else {
                    jumpCount++;
                }
                if (window.isSoundEnabled) {
                    jumpSound.play();
                  }
                initialVelocity = Math.sqrt(2 * gravity * (jumpHeight + (jumpCount === 2 ? jumpHeight / 2 : 0))); // Augmenter la hauteur pour le second saut
                performJump();
            }
        };
  
        function performJump() {
            let lastTime = performance.now();
        
            function jumpUpdate(time) {
                const deltaTime = (time - lastTime) / 1000;
                let displacement = initialVelocity * deltaTime - 0.5 * gravity * deltaTime * deltaTime;
                initialVelocity -= gravity * deltaTime; // Mise à jour de la vitesse initiale pour simuler la gravité
                lastTime = time;
        
                if (displacement < 0 && el.object3D.position.y + displacement < groundY) {
                    // Si le déplacement suivant est censé descendre en dessous du sol, ajustez pour atterrir précisément au sol
                    displacement = groundY - el.object3D.position.y;
                    isJumping = false;
                    jumpCount = 0;
                    initialVelocity = Math.sqrt(2 * gravity * jumpHeight); // Réinitialiser la vitesse pour le prochain saut
                }
        
                el.object3D.position.y += displacement;
        
                // Arrêter la mise à jour si le personnage a atterri et n'est pas en train de sauter
                if (!isJumping) {
                    el.object3D.position.y = groundY; // Assurez-vous de corriger tout arrondi
                    return;
                }
        
                requestAnimationFrame(jumpUpdate);
            }
        
            requestAnimationFrame(jumpUpdate);
        }
        
  
        document.addEventListener('keydown', function (event) {
            if (event.code === 'Space' && partieEncours === "1") { // Comparaison avec une chaîne de caractères
                startJump();
                console.log("Saute mouton");
            }
        });
        
        
        
        this.el.sceneEl.addEventListener('xbuttondown', startJump);
        this.el.sceneEl.addEventListener('abuttondown', startJump);
    }
  });
  