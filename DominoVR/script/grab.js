document.addEventListener('DOMContentLoaded', function () {
    const hands = document.querySelectorAll('.hand');
    const grabableObjects = document.querySelectorAll('.grabableObject');

    let grabbedObject = null; // L'objet actuellement saisi

    function checkGrab(hand, handEvent) {
      // Calculer la distance entre la main et l'objet
      const handPosition = new THREE.Vector3();
      hand.object3D.getWorldPosition(handPosition);

      grabableObjects.forEach(grabableObject => {
        const objectPosition = new THREE.Vector3();
        grabableObject.object3D.getWorldPosition(objectPosition);

        const distance = handPosition.distanceTo(objectPosition);

        // Si l'objet est proche et que rien n'est encore saisi
        if (distance < 0.5 && !grabbedObject) {
          grabbedObject = grabableObject;
          // Attacher l'objet à la main
          hand.appendChild(grabbedObject);
          grabbedObject.setAttribute('position', '0 0 0'); // Centrer l'objet dans la main
          grabbedObject.setAttribute('rotation', '0 0 0'); // Réinitialiser la rotation pour simplifier
        }
      });
      
      if (handEvent === 'triggerup' && grabbedObject) {
        // "Relâcher" l'objet
        document.querySelector('a-scene').appendChild(grabbedObject);
        grabbedObject = null;
      }
    }

    hands.forEach(hand => {
      hand.addEventListener('triggerdown', function () {
        checkGrab(hand, 'triggerdown');
      });

      hand.addEventListener('triggerup', function () {
        checkGrab(hand, 'triggerup');
      });
    });
  });