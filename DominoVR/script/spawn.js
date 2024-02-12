document.addEventListener('DOMContentLoaded', function() {
  const playerChairs = {
    1: { position: { x: 3.4, y: 1.4, z: 0 }, rotation: { x: 0, y: -90, z: 0 } },
    2: { position: { x: 3.4, y: 1.4, z: 0 }, rotation: { x: 0, y: 90, z: 0 } },
    3: { position: { x: 0.6, y: 1.4, z: 2.8 }, rotation: { x: 0, y: 0, z: 0 } },
    4: { position: { x: 0.6, y: 1.4, z: -2.8 }, rotation: { x: 0, y: 180, z: 0 } }
  };

  const chair = playerChairs[playerID];
  const playerEntity = document.getElementById('player');

  // Désactiver temporairement les contrôles de caméra pour appliquer la rotation
  playerEntity.setAttribute('look-controls', 'enabled: false');
  playerEntity.setAttribute('thumbstick-look-controls', 'enabled: false');
  playerEntity.setAttribute('custom-movement-controls', 'enabled: false');

  // Appliquer la position et la rotation
  playerEntity.setAttribute('position', `${chair.position.x-0.6} ${chair.position.y} ${chair.position.z}`);
  playerEntity.setAttribute('rotation', `${chair.rotation.x} ${chair.rotation.y} ${chair.rotation.z}`);

  // Optionnel : réactiver les contrôles après un court délai
  // setTimeout(() => {
  // playerEntity.setAttribute('look-controls', 'enabled: true');
  // playerEntity.setAttribute('thumbstick-look-controls', 'enabled', true);
  // playerEntity.setAttribute('custom-movement-controls', 'enabled', true);
  // }, 1000); 
});
