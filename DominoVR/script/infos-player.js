function updatePlayerInfo() {
    const playerEntity = document.getElementById('player');
    const position = playerEntity.getAttribute('position');
    const rotation = playerEntity.getAttribute('rotation');
  
    document.getElementById('playerNumber').textContent = playerID; // Assurez-vous que playerID est accessible
    document.getElementById('playerPosition').textContent = `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
    document.getElementById('playerRotation').textContent = `x: ${rotation.x.toFixed(2)}, y: ${rotation.y.toFixed(2)}, z: ${rotation.z.toFixed(2)}`;
  }
  
  // Mettez à jour les infos du joueur régulièrement ou suite à un événement spécifique
  setInterval(updatePlayerInfo, 1000); // Par exemple, mise à jour chaque seconde
  