export default class SceneWin extends Phaser.Scene {
  constructor() {
    super('Win')
  }

  preload() {
    this.load.image('winScene', '../ProyectoInteractivas1/img/assets/Win.png');
    this.load.on('filecomplete', (key) => { //Generado por ChatGPT - Solucion para que renderize una imagen con phaser
      console.log(`File loaded: ${key}`);
    });
    this.load.on('loaderror', (file) => {
      console.error(`Failed to load: ${file.key}`);
    });
  }

  create() {
    const bg = this.add.image(0, 0, 'winScene').setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    setTimeout(() => {
      if (confirm('Do you want to play again?')) {
        this.scene.start('Level1');
      } else {
        this.scene.stop('Win');
        window.location.replace('/');
      }
    }, 2000);
  }
}