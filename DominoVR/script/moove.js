AFRAME.registerComponent('custom-movement-controls', {
    schema: {
      speed: { type: 'number', default: 0.1 }
    },
  
    init: function () {
      this.onAxisMove = this.onAxisMove.bind(this);
      this.el.sceneEl.addEventListener('axismove', this.onAxisMove);
    },
  
    onAxisMove: function (evt) {
      if (evt.detail.hand !== this.data.hand) return; // Assurez-vous que l'événement vient du bon contrôleur
  
      let axis = evt.detail.axis;
      let movementX = axis[0] * this.data.speed; // Utilisez axis[0] pour le mouvement horizontal
      let movementZ = axis[1] * this.data.speed; // Utilisez axis[1] pour le mouvement avant/arrière
  
      let currentPosition = this.el.getAttribute('position');
      currentPosition.x += movementX;
      currentPosition.z -= movementZ; // Inversez si nécessaire selon l'orientation de votre scène
  
      this.el.setAttribute('position', currentPosition);
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener('axismove', this.onAxisMove);
    }
  });
  