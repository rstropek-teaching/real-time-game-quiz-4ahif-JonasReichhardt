import { game } from "./app";

export class menuState {
    create() {
        let nameLabel: Phaser.Text = game.add.text(80, 80, 'Defense of the Tavern', { font: '50px Arial', fill: '#ffffff' });

        let startLabel: Phaser.Text = game.add.text(80, game.world.height - 100, 'Press the "W" key to host a game', { font: '25px Arial', fill: '#ffffff' });

        let key: Phaser.Key = game.input.keyboard.addKey(Phaser.Keyboard.W);

        key.onDown.addOnce(this.start, this);
    }

    start() {
        game.state.start('play');
    }
   
}