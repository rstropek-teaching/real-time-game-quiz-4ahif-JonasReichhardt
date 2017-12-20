/// <reference path="phaser.d.ts" />

let scaleRatio:number = window.devicePixelRatio / 3;

class SimpleGame {
    game: Phaser.Game;
    platforms: Phaser.Group;
    player: Phaser.Sprite;
    ground: Phaser.Sprite;
    cursors: Phaser.CursorKeys;
    sword: Phaser.Sprite;

    preload() {
        this.game.load.image('bg', 'Assets/background.png');
        this.game.load.image('ground', 'Assets/ground.png');
        this.game.load.image('tavern', 'Assets/Tavern.png');
        this.game.load.image('sword', 'Assets/sword.png');
        this.game.load.spritesheet('player', 'Assets/dude.png', 32, 48);
        
    }

    create() {

        /*************************************************************************************/
        /**************************|Setting up the environment|*******************************/
        /*************************************************************************************/

        //We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'bg');

        this.sword = this.game.add.sprite(500, 500, 'sword');
        this.game.physics.arcade.enable(this.sword);
        this.sword.body.gravity.y = 200;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, this.game.world.height - 20, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 250, 'player');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        let hitPlatform: boolean = this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.sword, this.platforms);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -250;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 250;

            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -150;
        }

    }

}

window.onload = () => {
    const game = new Phaser.Game((window.innerWidth-25) * window.devicePixelRatio, (window.innerHeight-25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    game.state.add('Game', SimpleGame, true);
};