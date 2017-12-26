"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var loadState = (function () {
    function loadState() {
    }
    loadState.prototype.preload = function () {
        var loadingBar = app_1.game.add.text(80, 150, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
        app_1.game.load.image('bg', 'Assets/background.png');
        app_1.game.load.image('ground', 'Assets/ground.png');
        app_1.game.load.image('tavern', 'Assets/Tavern.png');
        app_1.game.load.image('sword', 'Assets/sword.png');
        app_1.game.load.spritesheet('player', 'Assets/dude.png', 32, 48);
    };
    loadState.prototype.create = function () {
        app_1.game.state.start('menu');
    };
    return loadState;
}());
exports.loadState = loadState;
