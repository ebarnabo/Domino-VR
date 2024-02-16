# Domino VR

## Description
Domino VR est un projet innovant développé dans le cadre du Master 2 MIAGE à la MIAGE des Antilles par Edwin Barnabot. Ce future jeu en réalité virtuelle offrira une expérience immersive de jeu de dominos, il permet permettant aux joueurs de se déplacer, de manipuler des dominos en mode VR grâce à Super Hands, de changer de scène et de texture des dominos, et bien plus encore.

## Fonctionnalités déjà disponibles
- **Déplacement** : Compatible avec le clavier et la manette Meta Quest (modes VR & AER).
- **Manipulation des Dominos** : Saisir et poser les dominos en mode VR grâce à Super Hands.
- **Changement de Scène** : Possibilité de changer la scène du jeu avec des modèles .glb, avec sauvegarde de la scène actuelle via localStorage.
- **Personnalisation des Dominos** : Changer le skin (texture) des dominos avec sauvegarde des préférences via localStorage.
- **Attribution de Numéro au Joueur** : Chaque joueur reçoit un numéro qui apparaît à côté de lui dans le jeu.
- **Génération de Dominos** : Les dominos sont générés aléatoirement et placés selon le numéro du joueur.
- **Textes Flottants** : Indication de la position de chaque joueur avec des textes flottants.

## Dépendances du projet
- [A-Frame 1.4.2](https://aframe.io/releases/1.4.2/aframe.min.js) pour la création de scènes VR.
- [Super Hands 3.0.3](https://unpkg.com/super-hands@^3.0.3/dist/super-hands.min.js) pour la manipulation d'objets en VR.
- [A-Frame Extras](https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.2.0/dist/aframe-extras.min.js) pour des fonctionnalités supplémentaires dans A-Frame.
- [A-Frame Text Geometry Component](https://unpkg.com/aframe-text-geometry-component@0.5.2/dist/aframe-text-geometry-component.min.js) pour l'affichage de textes 3D.
- [A-Frame GUI](https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js) pour l'interface utilisateur en VR.
- [SweetAlert2](https://cdn.jsdelivr.net/npm/sweetalert2@11) pour les alertes et modales stylisées.
- [Swiper](https://unpkg.com/swiper/swiper-bundle.min.js) pour les carrousels tactiles.
- [Font Awesome](https://kit.fontawesome.com/698cf3cd70.js) pour les icônes.

## Installation
1. Clonez ce dépôt sur votre serveur local ou distant.
2. Assurez-vous que toutes les dépendances sont correctement liées dans votre fichier `index.html`.
3. Le projet utilise Vite.js. Vous devrez utiliser la commande 'npm run dev' pour lancer le serveur du projet, en étant correctement positionné dans le répertoire 'DominoVR', qui se trouve à l'intérieur du dossier téléchargé
## Contribution
Toute contribution au projet est la bienvenue. Si vous souhaitez contribuer, veuillez forker le dépôt, créer une branche, apporter vos modifications et soumettre une pull request.

## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
