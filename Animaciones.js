export default class Animaciones {
    static crearAnimaciones(scene) {
        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 21 }),
            frameRate: 60,
            yoyo: true,
            repeat: -1
        });

        scene.anims.create({
            key: 'fly',
            frames: scene.anims.generateFrameNumbers('playerFlying', { start: 0, end: 41 }),
            frameRate: 60,
            repeat: -1
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 47 }),
            frameRate: 30,
            repeat: -1
        });

        scene.anims.create({
            key: 'mielIdle',
            frames: scene.anims.generateFrameNumbers('miel', { start: 0, end: 54 }),
            frameRate: 30,
            repeat: -1
        });

        scene.anims.create({
            key: 'dieFlying',
            frames: scene.anims.generateFrameNumbers('dieFlying', { start: 0, end: 26 }),
            frameRate: 30,
            repeat: -1
        });
         scene.anims.create({
            key: 'die',
            frames: scene.anims.generateFrameNumbers('die', { start: 0, end: 30 }),
            frameRate: 25,
            repeat: -1
        });

        scene.anims.create({
            key: 'liveIdle',
            frames: scene.anims.generateFrameNumbers('live', { start: 0, end: 60 }),
            frameRate: 30,
            repeat: -1
        });
        scene.anims.create({
            key: 'gotaIdle',
            frames: scene.anims.generateFrameNumbers('gota', { start: 0, end: 49 }),
            frameRate: 30,
            repeat: -1

        });
    }

}
