document.addEventListener('DOMContentLoaded', function () {
  const chairs = [
    // Chaise 1
    { position: { x: -2, y: 0, z: 0 }, rotation: { x: 0, y: 90, z: 0 }, playerNumber: 1, namePosition: { x: -2.5, y: 3.5, z: -2 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 2
    { position: { x: 2, y: 0, z: 0 }, rotation: { x: 0, y: -90, z: 0 }, playerNumber: 2, namePosition: { x: -2.5, y: 3.5, z: -2 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 3
    { position: { x: 0, y: 0, z: 2 }, rotation: { x: 0, y: 180, z: 0 }, playerNumber: 3, namePosition: { x: -2.5, y: 3.5, z: -2 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 4
    { position: { x: 0, y: 0, z: -2 }, rotation: { x: 0, y: 0, z: 0 }, playerNumber: 4, namePosition: { x: -2.5, y: 3.5, z: -2 }, nameRotation: { x: 0, y: 0, z: 0 } },
  ];

  const scene = document.querySelector('a-scene');

  chairs.forEach(chair => {
    const chairEntity = document.createElement('a-entity');
    chairEntity.setAttribute('position', `${chair.position.x} ${chair.position.y} ${chair.position.z}`);
    chairEntity.setAttribute('rotation', `${chair.rotation.x} ${chair.rotation.y} ${chair.rotation.z}`);
    chairEntity.setAttribute('id', `chair-${chair.playerNumber}`);
    chairEntity.classList.add('grab');

    const chairModel = document.createElement('a-entity');
    chairModel.setAttribute('gltf-model', 'url(assets/chaise_plastique.glb)');
    chairModel.setAttribute('scale', '0.8 0.8 0.88'); 
    chairEntity.appendChild(chairModel);

    const playerNameText = document.createElement('a-entity');
    playerNameText.setAttribute('text-geometry', `value: Joueur ${chair.playerNumber}; font: font/Facetype Press Start 2P.json`);
    playerNameText.setAttribute('position', `${chair.namePosition.x} ${chair.namePosition.y} ${chair.namePosition.z}`);
    playerNameText.setAttribute('rotation', `${chair.nameRotation.x} ${chair.nameRotation.y} ${chair.nameRotation.z}`);
    playerNameText.setAttribute('material', 'color: yellow');
    chairEntity.appendChild(playerNameText);

    // Création de l'animation d'ascension et de descente
    playerNameText.setAttribute('animation__move', {
      property: 'position',
      to: `${chair.namePosition.x} ${chair.namePosition.y + 0.2} ${chair.namePosition.z}`, // Position de destination
      dur: 2000,  // Durée de l'animation (en millisecondes)
      easing: 'easeInOutCubic',
      direction: 'alternate', // Jouer l'animation dans les deux sens
      loop: true // Répéter en boucle
    });

    scene.appendChild(chairEntity);
  });
});
