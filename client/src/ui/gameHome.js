import { createNewGame } from '../api/newgame.js'
import { joinGame } from '../api/joingame.js'
import { addSocketListener, sendSocketMessage, getSession } from '../api/websocket.js'

export function renderGameHome(app, game) {
  if (game !== 'tictactoe') {
    app.innerHTML = `
      <h2>Game not found</h2>
      <button id="back">← Back</button>
    `
    backToHome()
    return
  }

  // 1️⃣ RENDER LOBBY HTML FIRST
  app.innerHTML = `
    <h1>Tic Tac Toe</h1>

    <div class="card">
      <p><strong>Game ID:</strong> <span id="gameIdText">—</span></p>

      <div id="lobbyPlayers"></div>

      <button id="createBtn">Create Game</button>

      <div style="margin-top:20px;">
        <input id="gameIdInput" placeholder="Enter Game ID" />
        <button id="joinBtn">Join Game</button>
      </div>

      <button id="startGameBtn" style="display:none; margin-top:20px;">
        Start Game
      </button>
    </div>

    <button id="back">← Back</button>
  `

  // 2️⃣ QUERY DOM (NOW IT EXISTS)
  const gameIdText = document.getElementById('gameIdText')
  const playersDiv = document.getElementById('lobbyPlayers')
  const startBtn = document.getElementById('startGameBtn')

  // 3️⃣ WIRE BUTTONS
  createNewGame(game)
  joinGame(game)

  startBtn.onclick = () => {
    sendSocketMessage({ type: 'start_game' })
  }

  // 4️⃣ SINGLE SOCKET LISTENER FOR LOBBY
  addSocketListener((data) => {
    const { gameId, playerId, hostId } = getSession()

    // Lobby might not exist anymore
    if (!gameIdText || !playersDiv) return

    if (data.type === 'room_status') {
        const createBtn = document.getElementById('createBtn');
        const joinBtn = document.getElementById('joinBtn');
        const gameIdInput = document.getElementById('gameIdInput');

        if (createBtn) createBtn.style.display = 'none';
        if (joinBtn) joinBtn.style.display = 'none';
        if (gameIdInput) gameIdInput.style.display = 'none';

      gameIdText.textContent = gameId

      playersDiv.innerHTML = `
        <p><strong>Players:</strong></p>
        <ul>
          ${data.players.map(p => `<li>${p}</li>`).join('')}
        </ul>
      `

      // Show Start Game ONLY for host
      startBtn.style.display =
        playerId === hostId ? 'block' : 'none'
    }

    if (data.type === 'game_started') {
        history.pushState({}, '', '/game/tictactoe/play')
        window.dispatchEvent(new Event('popstate'))
    }

  })

  backToHome()
}

function backToHome() {
  document.getElementById('back').onclick = () => {
    history.pushState({}, '', '/')
    window.dispatchEvent(new Event('popstate'))
  }
}
