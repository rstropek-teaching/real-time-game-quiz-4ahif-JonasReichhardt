var scaleRatio = window.devicePixelRatio / 3;
var game = new Phaser.Game();
var bootState = (function () {
    function bootState() {
    }
    bootState.prototype.create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    };
    return bootState;
}());
var loadState = (function () {
    function loadState() {
    }
    loadState.prototype.preload = function () {
        var loadingBar = game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
        game.load.image('bg', 'Assets/background.png');
        game.load.image('ground', 'Assets/ground.png');
        game.load.image('tavern', 'Assets/Tavern.png');
        game.load.image('sword', 'Assets/sword.png');
        game.load.spritesheet('player', 'Assets/dude.png', 32, 48);
    };
    loadState.prototype.create = function () {
        game.state.start('menu');
    };
    return loadState;
}());
var menuState = (function () {
    function menuState() {
    }
    menuState.prototype.create = function () {
        var nameLabel = game.add.text(80, 80, 'Defense of the Tavern', { font: '50px Arial', fill: '#ffffff' });
        var hostLabel = game.add.text(80, game.world.height - 500, 'Press the "H" key to host a game', { font: '25px Arial', fill: '#ffffff' });
        var joinLabel = game.add.text(80, game.world.height - 400, 'Press the "J" key to join a game', { font: '25px Arial', fill: '#ffffff' });
        var hostKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
        var joinKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
        hostKey.onDown.addOnce(this.host, this);
        joinKey.onDown.addOnce(this.join, this);
    };
    menuState.prototype.host = function () {
        game.state.start('play');
    };
    menuState.prototype.join = function () {
    };
    return menuState;
}());
var playState = (function () {
    function playState() {
    }
    playState.prototype.preload = function () {
    };
    playState.prototype.create = function () {
        game.add.sprite(0, 0, 'bg');
        this.sword = game.add.sprite(500, 500, 'sword');
        game.physics.arcade.enable(this.sword);
        this.sword.body.gravity.y = 200;
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 20, 'ground');
        ground.body.immovable = true;
        this.player = game.add.sprite(32, game.world.height - 250, 'player');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = game.input.keyboard.createCursorKeys();
    };
    playState.prototype.update = function () {
        var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.sword, this.platforms);
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -250;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 250;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 4;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -150;
        }
    };
    return playState;
}());
window.onload = function () {
    game = new Phaser.Game((window.innerWidth - 25) * window.devicePixelRatio, (window.innerHeight - 25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);
    game.state.start('boot');
};
