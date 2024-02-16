document.addEventListener('DOMContentLoaded', function() {
  const playerChairs = {
    1: { position: { x: -1.6, y: 1.2, z: 0 }, rotation: { x: 0, y: -90, z: 0 } },
    2: { position: { x: 1.6, y: 1.2, z: 0 }, rotation: { x: 0, y: 90, z: 0 } },
    3: { position: { x: 0, y: 1.2, z: 1.6 }, rotation: { x: 0, y: 0, z: 0 } },
    4: { position: { x: 0, y: 1.2, z: -1.6 }, rotation: { x: 0, y: 180, z: 0 } }
  };

  console.log("Texture chargée : "+ selectedTexture);
  const chair = playerChairs[playerID];
  const playerEntity = document.getElementById('player');

  const cameraRig = document.getElementById('rig');

  // Appliquer la position et la rotation
  cameraRig.setAttribute('position', `${chair.position.x} ${chair.position.y-1.5} ${chair.position.z}`);
  cameraRig.setAttribute('rotation', `${chair.rotation.x} ${chair.rotation.y} ${chair.rotation.z}`);

});


