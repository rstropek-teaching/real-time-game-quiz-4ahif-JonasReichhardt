"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var playState = (function () {
    function playState() {
    }
    playState.prototype.preload = function () {
    };
    playState.prototype.create = function () {
        app_1.game.add.sprite(0, 0, 'bg');
        this.sword = app_1.game.add.sprite(500, 500, 'sword');
        app_1.game.physics.arcade.enable(this.sword);
        this.sword.body.gravity.y = 200;
        this.platforms = app_1.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, app_1.game.world.height - 20, 'ground');
        ground.body.immovable = true;
        this.player = app_1.game.add.sprite(32, app_1.game.world.height - 250, 'player');
        app_1.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = app_1.game.input.keyboard.createCursorKeys();
    };
    playState.prototype.update = function () {
        var hitPlatform = app_1.game.physics.arcade.collide(this.player, this.platforms);
        app_1.game.physics.arcade.collide(this.sword, this.platforms);
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
exports.playState = playState;
