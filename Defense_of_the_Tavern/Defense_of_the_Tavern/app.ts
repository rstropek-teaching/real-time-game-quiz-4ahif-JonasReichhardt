/// <reference path="phaser.d.ts" />

import { bootState } from "./boot";
import { loadState } from "./load";
import { menuState } from "./menu";
import { playState } from "./play";

let scaleRatio: number = window.devicePixelRatio / 3;
export let game: Phaser.Game = new Phaser.Game();

window.onload = () => {
    game = new Phaser.Game((window.innerWidth - 25) * window.devicePixelRatio, (window.innerHeight - 25) * window.devicePixelRatio, Phaser.AUTO, 'content');
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);

    game.state.start('boot');
};