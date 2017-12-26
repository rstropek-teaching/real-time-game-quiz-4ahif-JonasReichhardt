import { game } from "./app";

export class loadState {

    preload() {
        let loadingBar: Phaser.Text = game.add.text(80, 150, 'Loading...', {font: '30px Courier',fill: '#ffffff'});

        game.load.image('bg', 'Assets/background.png');
        game.load.image('ground', 'Assets/ground.png');
        game.load.image('tavern', 'Assets/Tavern.png');
        game.load.image('sword', 'Assets/sword.png');
        game.load.spritesheet('player', 'Assets/dude.png', 32, 48);

        
    }

    create() {
        game.state.start('menu');
    }
}