AFRAME.registerComponent('custom-look-controls', {
  schema: {
      sensitivity: { type: 'number', default: 100 } // Sensibilité de la rotation
  },

  init: function () {
      this.onThumbstickMove = this.onThumbstickMove.bind(this);
      this.el.sceneEl.addEventListener('axismove', this.onThumbstickMove);
  },

  onThumbstickMove: function (evt) {
      if (evt.detail.hand !== 'right') return; // S'assurer que l'événement vient du contrôleur droit

      let axis = evt.detail.axis;
      let lookRightLeft = axis[2]; // Axis 2 pour le mouvement horizontal sur certains contrôleurs, peut nécessiter ajustement
      let lookUpDown = axis[3]; // Axis 3 pour le mouvement vertical, peut nécessiter ajustement

      let rotation = this.el.getAttribute('rotation');

      // Appliquer la rotation. Ajustez ces valeurs selon les besoins de votre application.
      rotation.y -= lookRightLeft * this.data.sensitivity;
      rotation.x -= lookUpDown * this.data.sensitivity;

      // Assurez-vous que la rotation en x (haut/bas) est limitée pour éviter des rotations complètes
      rotation.x = Math.max(-90, Math.min(90, rotation.x));

      this.el.setAttribute('rotation', rotation);
  },

  remove: function () {
      this.el.sceneEl.removeEventListener('axismove', this.onThumbstickMove);
  }
});
