import { game } from "./app";

export class bootState {

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');
    }
}