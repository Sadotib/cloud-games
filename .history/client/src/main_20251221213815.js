import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Cloud Games</h1>
    <h3>Play simple fun games with friends in your browser!</h3>

    <div class="grid">
    <!-- Game Tile -->
    <div class="game-tile" data-game="tictactoe">
      <img src="/public/tictactoe.svg" alt="Tic Tac Toe" width="30%">
      <div class="game-title">Tic Tac Toe</div>
    </div>

    <div class="game-tile" data-game="rps">
      <img src="/public/rps.svg" alt="rps" width="30%">
      <div class="game-title">Rock Paper Scissors</div>
    </div>

    <div class="game-tile" data-game="snake">
      <img src="/public/snake.png" alt="Snake" width="30%">
      <div class="game-title">Snake</div>
    </div>

  </div>
`

startNewGame()      

joinGame()

