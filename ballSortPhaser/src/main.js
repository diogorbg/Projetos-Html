import { Boot } from './boot.js'
import { Game } from './game.js'
import { GameOver } from './gameOver.js'
import { Preloader } from './preloader.js'

const config = {
  type: Phaser.AUTO,
  width: 1080,
  height: 1440,
  // parent: divId,
  backgroundColor: '#333',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Game,
    Boot,
    Preloader,
    GameOver
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

const game = new Phaser.Game(config)
