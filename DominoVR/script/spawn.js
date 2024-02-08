document.addEventListener('DOMContentLoaded', function() {
  let playerIdentifier = localStorage.getItem('playerIdentifier');
  if (!playerIdentifier) {
    playerIdentifier = Math.floor(Math.random() * 4) + 1; 
    localStorage.setItem('playerIdentifier', playerIdentifier.toString());
  }

  const playerChairs = {
    1: { position: { x: -2, y: 1.4, z: 0 }, rotation: { x: 0, y: 90, z: 0 } },
    2: { position: { x: 2, y: 1.4, z: 0 }, rotation: { x: 0, y: -90, z: 0 } },
    3: { position: { x: 0, y: 1.4, z: 2 }, rotation: { x: 0, y: 180, z: 0 } },
    4: { position: { x: 0, y: 1.4, z: -2 }, rotation: { x: 0, y: 0, z: 0 } }
  };

  const chair = playerChairs[playerIdentifier];

  const playerEntity = document.getElementById('player');
  // Utiliser la position et la rotation de la chaise pour le joueur
  playerEntity.setAttribute('position', `${chair.position.x} ${chair.position.y} ${chair.position.z}`);
  playerEntity.setAttribute('rotation', `${chair.rotation.x} ${chair.rotation.y} ${chair.rotation.z}`);
});
