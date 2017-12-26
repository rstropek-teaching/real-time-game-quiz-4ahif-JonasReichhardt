"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var bootState = (function () {
    function bootState() {
    }
    bootState.prototype.create = function () {
        app_1.game.physics.startSystem(Phaser.Physics.ARCADE);
        app_1.game.state.start('load');
    };
    return bootState;
}());
exports.bootState = bootState;
