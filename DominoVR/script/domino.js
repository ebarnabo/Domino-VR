document.addEventListener('DOMContentLoaded', function () {
  const dominoWidth = 0.1;  // Largeur du domino
  const dominoDepth = 0.2;  // Profondeur du domino
  const dominoHeight = 0.05; // Épaisseur du domino
  const barWidth = 0.02; // Largeur de la barre
  const barHeight = 0.04; // Hauteur de la barre
  const barDepth = 0.04; // Profondeur de la barre
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
      // Correction pour positionner correctement les points sur les deux moitiés du domino
      let zPosition = pos.z; // Utiliser directement la position z calculée
      if (side === 'bottom') {
        zPosition += dominoDepth / 2; // Décaler pour la moitié inférieure
      }
      dot.setAttribute('position', `${pos.x-0.05} ${0.03} ${zPosition-0.15}`);
      dot.setAttribute('rotation', '90 0 0');
      domino.appendChild(dot);
    });
  }

  function getDotPositions(number) {
    const positions = []; // Tableau pour stocker les positions des points
    const spacing = dominoWidth / 4; // Espacement entre les points

    // Positions des points sur un domino traditionnel
    const dots = {
      0: [],
      1: [{ x: 0, z: 0 }],
      2: [{ x: -spacing, z: -spacing }, { x: spacing, z: spacing }],
      3: [{ x: -spacing, z: -spacing }, { x: 0, z: 0 }, { x: spacing, z: spacing }],
      4: [{ x: -spacing, z: -spacing }, { x: -spacing, z: spacing }, { x: spacing, z: -spacing }, { x: spacing, z: spacing }],
      5: [{ x: -spacing, z: -spacing }, { x: -spacing, z: spacing }, { x: 0, z: 0 }, { x: spacing, z: -spacing }, { x: spacing, z: spacing }],
      6: [{ x: -spacing, z: -spacing }, { x: -spacing, z: 0 }, { x: -spacing, z: spacing }, { x: spacing, z: -spacing }, { x: spacing, z: 0 }, { x: spacing, z: spacing }]
    };

    // Ajoute les positions de points basées sur le nombre donné
    positions.push(...dots[number]);

    // Ajuste les positions basées sur la taille du domino
    return positions.map(pos => ({ x: pos.x + dominoWidth / 2, z: pos.z + dominoDepth / 2 }));
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

      // Ajouter la barre fine au centre du domino
      const bar = document.createElement('a-box');
      bar.setAttribute('width', barWidth);
      bar.setAttribute('height', barHeight);
      bar.setAttribute('depth', barDepth);
      bar.setAttribute('position', `0 0 0`);
      bar.setAttribute('color', 'black');
      dominoEntity.appendChild(bar);

      // Ajouter les points sur chaque côté du domino
      addDots(dominoEntity, domino.number1, 'top');
      addDots(dominoEntity, domino.number2, 'bottom');

      document.querySelector('#vrscene').appendChild(dominoEntity);
    });
  }

  placeDominos(config);
});
