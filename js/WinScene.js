export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene')
  }

  create() {
    this.add.text(300, 300, 'Ganasteee').setScale(5);

   setTimeout(() => {
    if (confirm('Do you want to play again?')){
      this.scene.start('Level1');
    }
   }, 2000);
  }
}