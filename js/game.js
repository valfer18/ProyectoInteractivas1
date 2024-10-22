import Level1 from './Level1.js';
import Gameover from './Gameover.js';
import WinScene from './WinScene.js';
import Level3 from './Level3.js';

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 1200, // Ancho del juego base
  height: 700, // Altura del juego base
  scene: [Level1, Gameover, WinScene, Level3],
  title: 'Sweet Honey',
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200, // Puedes cambiar este valor si quieres ajustar el tamaño base
    height: 700  // Este valor también puede ser ajustado
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true
    }
  }
};

// create the game, and pass it the configuration
new Phaser.Game(config);
