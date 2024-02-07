document.addEventListener('DOMContentLoaded', function () {
  const chairs = [
    // Chaise 1
    { position: { x: -2, y: 0.5, z: 0 }, playerNumber: 1, namePosition: { x: -2, y: 2.4, z: 0 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 2
    { position: { x: 2, y: 0.5, z: 0 }, playerNumber: 2, namePosition: { x: 2, y: 2.4, z: 0 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 3
    { position: { x: 0, y: 0.5, z: 2 }, playerNumber: 3, namePosition: { x: 0, y: 2.4, z: 2 }, nameRotation: { x: 0, y: 0, z: 0 } },
    // Chaise 4
    { position: { x: 0, y: 0.5, z: -2 }, playerNumber: 4, namePosition: { x: 0, y: 2.4, z: -2 }, nameRotation: { x: 0, y: 0, z: 0 } },
  ];

  const scene = document.querySelector('a-scene');

  chairs.forEach(chair => {
    const chairEntity = document.createElement('a-entity');
    chairEntity.setAttribute('position', `${chair.position.x} ${chair.position.y} ${chair.position.z}`);
    chairEntity.setAttribute('id', `chair-${chair.playerNumber}`); // Ajout d'un identifiant unique à chaque chaise

    const chairModel = document.createElement('a-entity');
    chairModel.setAttribute('gltf-model', 'url(assets/3D/Chaise jardin plastique.glb)');
    chairModel.setAttribute('scale', '1 1 1'); 
    chairEntity.appendChild(chairModel);

    const playerNameText = document.createElement('a-text');
    playerNameText.setAttribute('value', `Joueur ${chair.playerNumber}`);
    playerNameText.setAttribute('position', `${chair.namePosition.x} ${chair.namePosition.y} ${chair.namePosition.z}`);
    playerNameText.setAttribute('rotation', `${chair.nameRotation.x} ${chair.nameRotation.y} ${chair.nameRotation.z}`);
    playerNameText.setAttribute('align', 'center');
    playerNameText.setAttribute('color', 'white');
    chairEntity.appendChild(playerNameText);

    scene.appendChild(chairEntity);
  });
});


