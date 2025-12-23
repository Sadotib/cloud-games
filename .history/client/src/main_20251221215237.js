import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'


document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="logo">Cloud Games</h1>
    <h3>Play simple fun games with friends in your browser!</h3>

    <div class="grid">
    <!-- Game Tile -->
      <div class="game-tile">
        <img src="/public/tictactoe.svg" alt="Tic Tac Toe" />
        <div class="game-label">Tic Tac Toe</div>
      </div>

      <div class="game-tile">
        <img src="/public/rps.svg" alt="Rock Paper Scissors" />
        <div class="game-label">Rock Paper Scissors</div>
      </div>
    </div>
  </div>
`

startNewGame()

joinGame()

