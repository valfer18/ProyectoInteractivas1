export default class SceneFinal extends Phaser.Scene {
  constructor() {
    super('Gameover')
  }
  preload() {
    this.load.image('gameover', '../ProyectoInteractivas1/img/assets/Gameover.png');
    this.load.on('filecomplete', (key) => {
      console.log(`File loaded: ${key}`);
    });
    this.load.on('loaderror', (file) => {
      console.error(`Failed to load: ${file.key}`);
    });
  }

  create() {
    const bg = this.add.image(0, 0, 'gameover').setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    setTimeout(() => {
      if (confirm('Do you want to play again?')) {
        this.scene.start('Level1');
      } else {
        this.scene.stop('Gameover');
        window.location.replace('/');
      }
    }, 2000);
  }
}