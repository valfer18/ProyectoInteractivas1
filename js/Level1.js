import Personaje from "./Personaje.js";
import Animaciones from './Animaciones.js';
export default class Scene1 extends Phaser.Scene {

  personaje;
  died;
  livesIndicators;
  gotas;


  constructor() {
    super('Level1');
    this.personaje = new Personaje();
    this.died = false;E
    this.livesIndicators = [];
    this.gotas = 0;
  }

  preload() {

    this.load.json('levelData', '../data/levelData.json');


    this.load.image('background', 'F://valfer18.github.io/ProyectoInteractivas1/img/assets/background.png');
    this.load.image('ground', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/ground.png');
    this.load.image('platform1', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/platform1.png');
    this.load.image('platform2', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/platform2.png');
    this.load.image('platform3', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/platform3.png');
    this.load.image('platform4', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/platform4.png');
    this.load.image('win', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/Goal.png');
    this.load.spritesheet('player', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/abeja-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet('playerFlying', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/abeja-volando-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet('playerIdle', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/abeja-idle-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet('miel', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/miel-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });

    this.load.spritesheet('dieFlying', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/abeja-muriendo-volando-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet('die', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/abeja-muriendo-spritesheet.png', {
      frameWidth: 55,
      frameHeight: 55,
      margin: 0,
      spacing: 0
    });
    this.load.spritesheet('live', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/vidas-spritesheet.png', {
      frameWidth: 60,
      frameHeight: 60,
      margin: 0,
      spacing: 0
    });

    this.load.spritesheet('liveIndicator', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/vida.png', {
      frameWidth: 60,
      frameHeight: 60,
      margin: 0,
      spacing: 0
    }); this.load.spritesheet('gota', 'https://valfer18.github.io/ProyectoInteractivas1/img/assets/sprite_gota.png', {
      frameWidth: 60,
      frameHeight: 60,
      margin: 0,
      spacing: 0
    });


    let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
  }

  setupLevel() {
    this.levelData = this.cache.json.get('levelData');

    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height); // Scale to match the scene size

    this.blocks = this.physics.add.staticGroup();
    this.blocks.create(1450, 650, 'ground');
    this.blocks.create(415, 650, 'ground');
    this.blocks.create(50, 330, 'platform1');
    this.blocks.create(50, 500, 'platform2');
    this.blocks.create(550, 400, 'platform3');
    this.blocks.create(1200, 275, 'platform2');

    this.platform = this.add.sprite(930, 350, 'platform4');
    this.platform.speed = 2;
    this.platform.movingDown = true;
    this.platform.setScale(0.3);
    this.physics.add.existing(this.platform);
    this.platform.body.setAllowGravity(false);
    this.platform.body.setImmovable(true);

    this.mielList = this.physics.add.group({
      allowGravity: false,
      immovable: true // Las plantas no se moverán
    });

    this.livesList = this.physics.add.group({
      allowGravity: false,
      immovable: true // Las plantas no se moverán
    });

    this.gotasList = this.physics.add.group({
      allowGravity: false,
      immovable: true // Las plantas no se moverán
    });

    // Crear varias pla ntas
    this.levelData.mielCoordinates.forEach(coord => {
      const miel = this.mielList.create(coord.x, coord.y, 'miel');
      miel.setScale(1.5);
      miel.anims.play('mielIdle');
      miel.body.setSize(40, 50); // Ajustar el tamaño del cuerpo al tamaño del sprite
    });

    this.levelData.livesCoordinates.forEach(coord => {
      const live = this.livesList.create(coord.x, coord.y, 'live');
      live.setScale(1.5);
      live.anims.play('liveIdle');
      live.setScale(0.8); // Ajustar el tamaño del cuerpo al tamaño del sprite


    });

    this.levelData.gotasCoordinates.forEach(coord => {
      const gota = this.gotasList.create(coord.x, coord.y, 'gota');
      gota.setScale(1.5);
      gota.anims.play('gotaIdle');
      gota.setScale(0.8);


    });



    const deadZone = this.add.sprite(950, 700, 'platform3').setAlpha(.1);
    this.physics.add.existing(deadZone);
    deadZone.body.setAllowGravity(false);

    const winZone = this.add.sprite(1150, 210, 'win');
    this.physics.add.existing(winZone);
    winZone.body.setAllowGravity(false);
    winZone.body.setImmovable(true);

    this.player = this.add.sprite(25, 250, 'player', 3);
    this.physics.add.existing(this.player);
    this.player.body.collideWorldBounds = true;
    this.physics.add.collider(this.platform, this.player);
    this.physics.add.collider(this.player, this.blocks);
    this.physics.add.collider(this.player, this.mielList, this.handleLooseCollision);
    this.physics.add.collider(this.player, this.livesList, this.handleLivesCollision);
    this.physics.add.collider(this.player, this.plants, this.handlePlantCollision);
    this.physics.add.collider(this.player, deadZone, this.handleLooseCollision);
    this.physics.add.collider(this.player, winZone, this.handleWinCollision);
    this.physics.add.collider(this.player, this.gotasList, this.handleGotaCollision);


    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 200,
      y: 500,
      radius: 50,
      base: this.add.circle(0, 0, 30, 0x888888),
      thumb: this.add.circle(0, 0, 15, 0xcccccc),
    });
    this.joystickCursors = this.joyStick.createCursorKeys();
  }

  handleGotaCollision = (player, gota) => {
    // Destruir el objeto de vida (live)
    gota.destroy();
    this.gotas++;
    console.log(this.gotas)
  }
  restart() {
    this.personaje = new Personaje();
    this.died = false;
    this.gotas = 0;
  }

  handleLivesCollision = (player, live) => {
    // Incrementar las vidas del jugador
    this.personaje.incrementarVida();
    this.updateLiveIndicators();
    // Destruir el objeto de vida (live)
    live.destroy();

  };

  handleWinCollision = () => {
    if (this.gotas == 5) {
      this.scene.switch("Win");
      this.restart();
    } else {
      this.text = this.add.text(300, 200, "Debes de conseguir todas las gotas de miel primero", {
        fontSize: '20px',
        fill: '#ffffff',
        backgroundColor: '#000000',

      });
      console.log('Texto creado:', this.text);

      setTimeout(() => {
        this.text.destroy();

      }, 500);
    }
  }

  handleLooseCollision = () => {
    if (this.time.now > this.timeDelay && !this.die) {
      this.personaje.perderVida();

      console.log(this.personaje.vida);
      this.died = true;
      console.log(this.died);

      // Detener todas las animaciones actuales
      this.player.anims.stop();
      this.player.body.setVelocityX(0);
      // Reproducir la animación "die" inmediatamente
      this.player.anims.play("die", true);

      // Establecer un retraso para evitar múltiples colisiones
      this.timeDelay = this.time.now + 4000;

      setTimeout(() => {
        this.cameras.main.fade(1000);

        //when fade is completed, restart game
        this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
          //restart game 
          if (this.personaje.vida == 0) {

            this.scene.switch('Gameover');
            this.restart();

          } else {
            this.scene.restart();
            this.died = false;
            this.gotas = 0;
          }
        }, this)
      }, 200);
    }
  }


  updateLiveIndicators() {


    const lives = this.personaje.vida; // Get current number of lives
    const xStart = 50; // Starting x position
    const yStart = 50; // Starting y position
    const spacing = 10; // Space between indicators
    const spriteWidth = 60; // Adjust this according to your sprite width

    // Create life indicators
    for (let i = 0; i < lives; i++) {
      // Calculate the x position for each indicator
      const x = xStart + (i * (spacing + spriteWidth)); // Adjust position based on index
      const y = yStart; // Keep y position the same for a horizontal line

      // Create and store the live indicator
      const liveIndicator = this.add.sprite(x, y, 'liveIndicator');
      liveIndicator.setScale(0.8); // Scale the indicator as needed
      this.livesIndicators.push(liveIndicator); // Add to the list
    }
  }





  update() {

    if (this.platform.movingDown) {
      this.platform.y += this.platform.speed;  // Mueve hacia abajo
    } else {
      this.platform.y -= this.platform.speed;  // Mueve hacia arriba
    }

    // Cambiar dirección al llegar a los bordes
    if (this.platform.y > 650) {
      this.platform.movingDown = false;  // Cambiar a movimiento hacia arriba
    } else if (this.platform.y < 300) {
      this.platform.movingDown = true;  // Cambiar a movimiento hacia abajo
    }

    if (this.died) {
      return;  // No hacer nada más si el personaje ha muerto
    }




    const onGround = this.player.body.onFloor();

    // Resetear velocidad horizontal
    this.player.body.setVelocityX(0);

    // Manejo de movimiento a la izquierda
    if (this.cursors.left.isDown || this.joystickCursors.left.isDown) {

      this.player.body.setVelocityX(-this.personaje.speed);
      this.player.flipX = true;

      // Reproducir animación de caminar
      if (onGround) {
        this.player.anims.play('walk', true);
      }
    }
    // Manejo de movimiento a la derecha
    else if (this.cursors.right.isDown || this.joystickCursors.right.isDown) {
      this.player.body.setVelocityX(this.personaje.speed);
      this.player.flipX = false;

      // Reproducir animación de caminar
      if (onGround) {
        this.player.anims.play('walk', true);
      }
    }
    // Si no se está moviendo y está en el suelo
    else if (onGround) {
      // Reproducir animación de idle
      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'idle') {
        this.player.anims.play('idle');
      }
    }

    // Manejar el vuelo
    if (this.cursors.up.isDown || this.cursors.space.isDown || this.joystickCursors.up.isDown) {
      if (onGround) {
        this.player.body.setVelocityY(-this.personaje.speed * 2); // Salto inicial al despegar
      } else {
        // Ajustar velocidad en el aire para vuelo
        this.player.body.setVelocityY(-this.personaje.speed);
      }

      // Reproducir animación de vuelo
      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'fly') {
        this.player.anims.play('fly', true);
      }
    }
  }






  create() {

    this.timeDelay = 0;
    Animaciones.crearAnimaciones(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setupLevel();
    this.updateLiveIndicators();

  }
}
