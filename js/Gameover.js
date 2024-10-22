export default class SceneFinal extends Phaser.Scene {
  constructor() {
    super('Gameover')
  }

  create() {
    this.add.text(300, 300, 'Haz Perdido').setScale(5);

   setTimeout(() => {
    if (confirm('Do you want to play again?')){
      this.scene.start('Level1');
    }else{
      this.scene.stop('Gameover');  
      window.location.replace('/');
    }
   }, 2000);
  }
}