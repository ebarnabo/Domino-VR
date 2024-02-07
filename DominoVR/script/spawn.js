document.addEventListener('DOMContentLoaded', function() {
  // Récupérer ou définir l'identifiant du joueur
  let playerIdentifier = localStorage.getItem('playerIdentifier');
    playerIdentifier = Math.floor(Math.random() * 4) + 1; 
    localStorage.setItem('playerIdentifier', playerIdentifier.toString());

  const playerChairs = {
    1: { x: -2, y: 0.5, z: 0 },
    2: { x: 2, y: 0.5, z: 0 },
    3: { x: 0, y: 0.5, z: 2 },
    4: { x: 0, y: 0.5, z: -2 }
  };

  const position = playerChairs[playerIdentifier];
  const playerEntity = document.getElementById('player');
  playerEntity.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
  // Définir d'autres attributs de l'entité selon le besoin
});