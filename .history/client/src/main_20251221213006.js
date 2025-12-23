import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Cloud Games</h1>
    <h3>Play simple fun games with friends in your browser!</h3>

    <div class="game-grid">
    <!-- Game Tile -->
    <div class="game-tile" data-game="tictactoe">
      <img src="/public/tictactoe.svg" alt="Tic Tac Toe" width="1rem" height="1rem">
      <div class="game-title">Tic Tac Toe</div>
    </div>

    <div class="game-tile" data-game="chess">
      <img src="/assets/chess.png" alt="Chess">
      <div class="game-title">Chess</div>
    </div>

    <div class="game-tile" data-game="snake">
      <img src="/assets/snake.png" alt="Snake">
      <div class="game-title">Snake</div>
    </div>

  </div>
`

startNewGame()      

joinGame()

