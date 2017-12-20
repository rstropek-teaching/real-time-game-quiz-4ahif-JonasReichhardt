var scaleRatio = window.devicePixelRatio / 3;
var SimpleGame = (function () {
    function SimpleGame() {
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('bg', 'Assets/background.bmp');
        this.game.load.image('ground', 'Assets/ground.bmp');
        this.game.load.image('tavern', 'Assets/Tavern.png');
        this.game.load.image('sword', 'Assets/sword.png');
        this.game.load.spritesheet('player', 'Assets/dude.png', 32, 48);
    };
    SimpleGame.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'bg');
        this.sword = this.game.add.sprite(500, 500, 'sword');
        this.game.physics.arcade.enable(this.sword);
        this.sword.body.gravity.y = 200;
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ledge = this.platforms.create(this.game.world.width - (this.game.world.width - 1), this.game.world.height - (this.game.world.height - 425), 'tavern');
        ledge.body.immovable = true;
        this.player = this.game.add.sprite(32, this.game.world.height - 250, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    SimpleGame.prototype.update = function () {
        var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.sword, this.platforms);
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
            this.player.body.velocity.y = -500;
        }
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new Phaser.Game((window.innerWidth - 25) * window.devicePixelRatio, (window.innerHeight - 25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    game.state.add('Game', SimpleGame, true);
};
