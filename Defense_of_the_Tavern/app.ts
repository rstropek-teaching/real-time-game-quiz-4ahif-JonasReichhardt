/// <reference path="phaser.d.ts" />


let scaleRatio: number = window.devicePixelRatio / 3;
let game: Phaser.Game = new Phaser.Game();

declare const io: SocketIOStatic;

const socket = io();

class bootState {

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');
    }
}

class loadState {

    preload() {
        let loadingBar: Phaser.Text = game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#ffffff' });

        game.load.image('bg', 'Assets/background.png');
        game.load.image('ground', 'Assets/ground.png');
        game.load.image('tavern', 'Assets/Tavern.png');
        game.load.image('sword', 'Assets/sword.png');
        game.load.spritesheet('player', 'Assets/dude.png', 32, 48);


    }

    create() {
        game.state.start('menu');
    }
}

class menuState {
    create() {
        let nameLabel: Phaser.Text = game.add.text(80, 80, 'Defense of the Tavern', { font: '50px Arial', fill: '#ffffff' });

        let joinLabel: Phaser.Text = game.add.text(80, game.world.height - 400, 'Press the "J" key to join a game', { font: '25px Arial', fill: '#ffffff' });

        let joinKey: Phaser.Key = game.input.keyboard.addKey(Phaser.Keyboard.J);

        joinKey.onDown.addOnce(this.join, this);
    }

    join() {
        game.state.start('play');
    }

}

class playState {
    platforms: Phaser.Group;
    player: Phaser.Sprite;
    ground: Phaser.Sprite;
    cursors: Phaser.CursorKeys;
    sword: Phaser.Sprite;
    otherPlayer: Phaser.Sprite;
    
    preload() {


    }


    create() {

        /*************************************************************************************/
        /**************************|Setting up the environment|*******************************/
        /*************************************************************************************/

        //  A simple background for our game
        game.add.sprite(0, 0, 'bg');

        this.sword = game.add.sprite(500, 500, 'sword');
        game.physics.arcade.enable(this.sword);
        this.sword.body.gravity.y = 200;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, game.world.height - 20, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        // The player and its settings
        this.player = game.add.sprite(32, game.world.height - 250, 'player');

        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = game.input.keyboard.createCursorKeys();

        socket.emit('newPlayer');

    }

    update() {
        let hitPlatform: boolean = game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.sword, this.platforms);

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

        } else {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -150;
        }

        socket.on('newPlayer', function (data) {
            const player: (number|number) = <number|number>data;
            this.otherPlayer = game.add.sprite(player[0], player[1], 'player');
        });

        socket.on('remove',function(id){
           this.otherPlayer.kill();
        });
    }
    

}

window.onload = () => {
    game = new Phaser.Game((window.innerWidth - 25) * window.devicePixelRatio, (window.innerHeight - 25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);

    game.state.start('boot');
};