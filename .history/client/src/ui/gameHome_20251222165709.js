import { startNewGame } from '../api/newgame.js'
import { joinGame } from '../api/joingame.js'

export function renderGameHome(app, game) {
  app.innerHTML = `
    <h1>${formatGameName(game)}</h1>

    <div class="card">
      <button id="createBtn">Create Game</button>
      <button id="join">Join Game</button>
    </div>

    <button id="back">← Back</button>
    <pre id="log"></pre>
  `

  document.getElementById('create').onclick = () => startNewGame(game)
  document.getElementById('join').onclick = () => joinGame(game)

  document.getElementById('back').onclick = () => {
    history.pushState({}, '', '/')
    window.dispatchEvent(new Event('popstate'))
  }
}

function formatGameName(game) {
  return game === 'tictactoe'
    ? 'Tic Tac Toe'
    : 'Rock Paper Scissors'
}
