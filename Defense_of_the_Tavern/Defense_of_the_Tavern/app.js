"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boot_1 = require("./boot");
var load_1 = require("./load");
var menu_1 = require("./menu");
var play_1 = require("./play");
var scaleRatio = window.devicePixelRatio / 3;
exports.game = new Phaser.Game();
window.onload = function () {
    exports.game = new Phaser.Game((window.innerWidth - 25) * window.devicePixelRatio, (window.innerHeight - 25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    exports.game.state.add('boot', boot_1.bootState);
    exports.game.state.add('load', load_1.loadState);
    exports.game.state.add('menu', menu_1.menuState);
    exports.game.state.add('play', play_1.playState);
    exports.game.state.start('boot');
};
