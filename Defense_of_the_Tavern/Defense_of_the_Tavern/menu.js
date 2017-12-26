"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var menuState = (function () {
    function menuState() {
    }
    menuState.prototype.create = function () {
        var nameLabel = app_1.game.add.text(80, 80, 'Defense of the Tavern', { font: '50px Arial', fill: '#ffffff' });
        var startLabel = app_1.game.add.text(80, app_1.game.world.height - 100, 'Press the "W" key to host a game', { font: '25px Arial', fill: '#ffffff' });
        var key = app_1.game.input.keyboard.addKey(Phaser.Keyboard.W);
        key.onDown.addOnce(this.start, this);
    };
    menuState.prototype.start = function () {
        app_1.game.state.start('play');
    };
    return menuState;
}());
exports.menuState = menuState;
