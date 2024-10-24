import Level1 from './Level1.js';
import Gameover from './Gameover.js';
import Win from './Win.js';
import Level3 from './Level3.js';

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  scene: [Level1, Gameover, Win, Level3],
  title: 'Sweet Honey',
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 700,
    orientation: 'landscape'
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
    }
  }
};

new Phaser.Game(config);
