document.addEventListener('DOMContentLoaded', function () {
  const dominoWidth = 0.1;  // Largeur du domino
  const dominoDepth = 0.2;  // Profondeur du domino
  const dominoHeight = 0.05; // Épaisseur du domino
  const dominos = generateDominos(); // Générer les dominos avec leurs ID

  // Configuration pour la démo, pourrait être ajustée selon les besoins
  const config = { angleDegrees: 0, height: 1.05, position: 1.2, spacing: 0.12 };

  function generateDominos() {
    let dominos = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        dominos.push({ id: `${i}${j}`, number1: i, number2: j });
      }
    }
    return dominos;
  }

  function addDots(domino, number, side) {
    const dotPositions = getDotPositions(number); // Obtenir les positions des points pour le nombre spécifié
    dotPositions.forEach(pos => {
      const dot = document.createElement('a-cylinder');
      dot.setAttribute('height', 0.01);
      dot.setAttribute('radius', 0.01);
      dot.setAttribute('color', 'black');
      // Ajustement pour positionner correctement les points sur les deux moitiés du domino
      const zPosition = side === 'top' ? pos.z : pos.z + (dominoDepth / 2); // Ajustement de la position z en fonction de la moitié du domino
      dot.setAttribute('position', `${pos.x} ${0.03} ${zPosition}`);
      dot.setAttribute('rotation', '90 0 0');
      domino.appendChild(dot);
    });
  }
  

  function getDotPositions(number) {
    const positions = []; // Tableau pour stocker les positions des points
    const spacing = 0.035; // Espacement entre les points
  
    // Coordonnées de base pour centrer les points sur chaque moitié du domino
    const baseX = -0.025;
    const baseZ = -0.075;
  
    switch (number) {
      case 0:
        break; // Aucun point pour 0
      case 1:
        positions.push({ x: baseX, z: baseZ + 0.1 });
        break;
      case 2:
        positions.push({ x: baseX - spacing, z: baseZ + spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ - spacing + 0.1 });
        break;
      case 3:
        positions.push({ x: baseX, z: baseZ + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ + spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ - spacing + 0.1 });
        break;
      case 4:
        positions.push({ x: baseX - spacing, z: baseZ + spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ - spacing + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ - spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ + spacing + 0.1 });
        break;
      case 5:
        positions.push({ x: baseX, z: baseZ + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ + spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ - spacing + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ - spacing + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ + spacing + 0.1 });
        break;
      case 6:
        positions.push({ x: baseX - spacing, z: baseZ + 0.05 + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ + 0.05 + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ - 0.05 + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ - 0.05 + 0.1 });
        positions.push({ x: baseX - spacing, z: baseZ + 0.1 });
        positions.push({ x: baseX + spacing, z: baseZ + 0.1 });
        break;
    }
  
    return positions;
  }
  

  function placeDominos(config) {
    const angleRadians = config.angleDegrees * Math.PI / 180;
    const xOffset = config.position * Math.cos(angleRadians);
    const zOffset = config.position * Math.sin(angleRadians);
    let rowStart = -(dominos.length - 1) * config.spacing / 2;

    dominos.forEach((domino, i) => {
      const dominoEntity = document.createElement('a-entity');
      const x = xOffset + rowStart + i * config.spacing;
      const z = zOffset;

      dominoEntity.setAttribute('geometry', `primitive: box; width: ${dominoWidth}; height: ${dominoHeight}; depth: ${dominoDepth}`);
      dominoEntity.setAttribute('material', 'color: #FFFFFF');
      dominoEntity.setAttribute('position', `${x} ${config.height} ${z}`);
      dominoEntity.setAttribute('rotation', `0 ${config.angleDegrees} 0`);
      dominoEntity.setAttribute('id', `domino-${domino.id}`);

      // Ajouter les points sur chaque côté du domino
      addDots(dominoEntity, domino.number1, 'top');
      addDots(dominoEntity, domino.number2, 'bottom');

      document.querySelector('#vrscene').appendChild(dominoEntity);
    });
  }

  placeDominos(config);
});
