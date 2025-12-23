import { startNewGame } from '../api/newgame.js'
import { joinGame } from '../api/joingame.js'

export function renderGameHome(app, game) {
  app.innerHTML = `
    <h1>${formatGameName(game)}</h1>

    <div class="card">
      <button id="createBtn">Create Game</button>
      <button id="joinBtn">Join Game</button>
    </div>

    <div class="card">
          <button id="createBtn">Create Game</button>
          
      
          <pre id="log" style="
            margin-top:20px;
            border:1px solid #ccc;
            padding:10px;
            height:200px;
            overflow-y:auto;
            background:#f7f7f7;
            color: grey;
            text-align: left;
          ">
          </pre>
      
          <div style="margin-top:20px;">
            <input id="gameIdInput" placeholder="Enter Game ID" />
            <button id="joinBtn">JOIN</button>
          </div>
      
    </div>

    <button id="back">← Back</button>
    <pre id="log"></pre>
  `

  document.getElementById('createBtn').onclick = () => startNewGame(game)
  document.getElementById('joinBtn').onclick = () => joinGame(game)

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
