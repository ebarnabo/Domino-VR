// vite.config.js
export default {
    // Autres configurations...
    server: {
      watch: {
        // Ignorer les changements dans les fichiers de la scène A-Frame
        ignored: '**/vitejs-scene/*',
      },
    },
  };
  