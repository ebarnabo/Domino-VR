document.addEventListener('DOMContentLoaded', function () {
  const dominoWidth = 0.1;  // Largeur du domino
  const dominoDepth = 0.2;  // Profondeur du domino
  const dominoHeight = 0.05; // Épaisseur du domino
  const barWidth = 0.02; // Largeur de la barre
  const barHeight = 0.04; // Hauteur de la barre
  let dominos = generateDominos();
  let dominoEntity;
  const player1color = 'gold' ;
  const player2color = 'silver' ;
  const player3color = 'blue';
  const player4color = 'green';

  const chairs = [
    // Chaise 1
    { 
      position: { x: -1.5, y: 0.6, z: -0.75 }, 
      angleDegrees: 0, 
      barAngleDegrees: 90, 
      width: 0.1, 
      height: 0.05, 
      barColor: player1color, 
      gap: 0.25,
      playerNumber: 1 
    },
    // Chaise 2
    { 
      position: { x: 1.2, y: 0.6, z: -0.75 }, 
      angleDegrees: 0, 
      barAngleDegrees: 90, 
      width: 0.1, 
      height: 0.05, 
      barColor: player2color, 
      gap: 0.25,
      playerNumber: 2 
    },
    // Chaise 3
    { 
      position: { x: 0.75, y: 0.6, z: 1.1 }, 
      angleDegrees: 90, 
      barAngleDegrees: 90, 
      width: 0.1, 
      height: 0.05, 
      barColor: player3color, 
      gap: 0.25,
      playerNumber: 3 
    },
    // Chaise 4
    { 
      position: { x: 0.75, y: 0.6, z: -1.5 }, 
      angleDegrees: 90, 
      barAngleDegrees: 90, 
      width: 0.1, 
      height: 0.05, 
      barColor: player4color, 
      gap: 0.25,
      playerNumber: 4 
    },
  ];

  function generateDominos() {
    let dominos = [];
    const used = new Set(); // Utilisé pour suivre les dominos déjà générés
    while (dominos.length < 28) { // Générer tous les dominos possibles
      const number1 = Math.floor(Math.random() * 7); // Nombre aléatoire entre 0 et 6 inclus
      const number2 = Math.floor(Math.random() * (7 - number1)) + number1; // Nombre aléatoire entre number1 et 6 inclus
      const id = `${number1}${number2}`;
      if (!used.has(id)) { // Vérifier si ce domino n'a pas déjà été généré
        dominos.push({ id: id, class: 'grab', number1: number1, number2: number2 });
        used.add(id); // Ajouter l'ID du domino généré à l'ensemble utilisé
      }
    }
    return dominos;
  }
  

  function addDots(domino, number, side) {
    const dotPositions = getDotPositions(number); // Obtenir les positions des points pour le nombre spécifié
    dotPositions.forEach(pos => {
      const dot = document.createElement('a-sphere');
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

  function placeDominosForPlayer(playerChaise, dominos) {
    const angleRadians = playerChaise.angleDegrees * Math.PI / 180;
    const xOffset = playerChaise.position.x + playerChaise.gap * Math.cos(angleRadians);
    const zOffset = playerChaise.position.z + playerChaise.gap * Math.sin(angleRadians);

    dominos.forEach((domino, index) => {
      const dominoEntity = document.createElement('a-entity');
      const x = xOffset - (index * playerChaise.gap * Math.sin(angleRadians));
      const z = zOffset + (index * playerChaise.gap * Math.cos(angleRadians));

      

      dominoEntity.setAttribute('geometry', `primitive: box; width: ${playerChaise.width}; height: ${playerChaise.height}; depth: ${dominoDepth}`);
      //dominoEntity.setAttribute('material', 'color: grey',`src: ${selectedTexture}`);
      //dominoEntity.setAttribute('material',`src: ${selectedTexture}`);
      dominoEntity.setAttribute('position', `${x} ${playerChaise.position.y} ${z}`);
      dominoEntity.setAttribute('rotation', `0 ${playerChaise.angleDegrees} 0`);
      dominoEntity.setAttribute('id', `domino-${domino.id}`);
      dominoEntity.setAttribute('dynamic-body', '');
      dominoEntity.setAttribute('grabbable', '');
      dominoEntity.setAttribute('droppable', '');
      dominoEntity.setAttribute('class', 'domino');
      dominoEntity.setAttribute('collision-filter', 'group: dominos; collidesWith: default, hands');


      // Ajouter la barre fine au centre du domino
      const bar = document.createElement('a-box');
      bar.setAttribute('width', barWidth / 3);
      bar.setAttribute('height', playerChaise.height); // hauteur égale à celle du domino
      bar.setAttribute('depth', 0.085);
      bar.setAttribute('position', `0 ${(playerChaise.height / 2) - (barHeight / 2)} 0`); // Positionner la barre au milieu du domino en hauteur
      bar.setAttribute('color', playerChaise.barColor);
      // Définir la rotation de la barre ici
      bar.setAttribute('rotation', `0 ${playerChaise.barAngleDegrees} 0`);
      dominoEntity.appendChild(bar);

      // Ajouter les points sur chaque côté du domino
      addDots(dominoEntity, domino.number1, 'top');
      addDots(dominoEntity, domino.number2, 'bottom');

      document.querySelector('#vrscene').appendChild(dominoEntity);
    });
  }

  // Appeler placeDominosForPlayer pour chaque joueur avec les bonnes coordonnées
  chairs.forEach(chaise => {
    const dominosForPlayer = dominos.splice(0, 7);
    placeDominosForPlayer(chaise, dominosForPlayer);
  });
});
