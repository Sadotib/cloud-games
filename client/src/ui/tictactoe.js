import {
  addSocketListener,
  sendSocketMessage,
  getSession,
  disconnectWebSocket
} from '../api/websocket.js'
import { resetJoinState } from '../api/joingame.js'

import { quitGame } from '../api/quitgame.js'

export function renderTicTacToeGame(app) {
  const { playerId, hostId } = getSession()
  const mySymbol = playerId === hostId ? "X" : "O"

  // ---------- Render UI ----------
  app.innerHTML = `
    <h2>Tic Tac Toe</h2>
    <div id="status">Waiting...</div>

    <div id="board" style="
      display:grid;
      grid-template-columns: repeat(3, 80px);
      gap:10px;
      margin:20px 0;
    "></div>

    <button id="rematchBtn" style="display:none">Rematch</button>
    <button id="quitBtn">Quit</button>
  `

  const boardDiv = document.getElementById("board")
  const statusDiv = document.getElementById("status")
  const rematchBtn = document.getElementById("rematchBtn")
  const quitBtn = document.getElementById("quitBtn")

  const cells = []

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.style.width = "80px"
    cell.style.height = "80px"
    cell.style.border = "1px solid black"
    cell.style.display = "flex"
    cell.style.alignItems = "center"
    cell.style.justifyContent = "center"
    cell.style.fontSize = "32px"
    cell.style.cursor = "pointer"

    cell.onclick = () => {
      sendSocketMessage({ type: "move", index: i })
    }

    boardDiv.appendChild(cell)
    cells.push(cell)
  }

  // ---------- SINGLE socket listener ----------
  addSocketListener((data) => {

    if (data.type === "player_left") {
      alert("The other player left the game.")

      disconnectWebSocket(getSession().playerId)
      resetJoinState()

      history.replaceState({}, "", "/")
      window.dispatchEvent(new Event("popstate"))
      return
    }
  })
  addSocketListener((data) => {
    if (data.type !== "game_state") return

    // update board
    data.board.forEach((v, i) => {
      cells[i].textContent = v
    })

    // winner
    if (data.winner) {
      if (data.winner === "draw") {
        statusDiv.textContent = "Draw!"
      } else if (data.winner === mySymbol) {
        statusDiv.textContent = "You win!"
      } else {
        statusDiv.textContent = "You lose!"
      }

      rematchBtn.style.display = "inline-block"
      return
    }

    // turn indicator
    statusDiv.textContent =
      data.turn === mySymbol ? "Your turn" : "Opponent's turn"
  })

  // ---------- Rematch ----------
  rematchBtn.onclick = () => {
    rematchBtn.style.display = "none"
    sendSocketMessage({ type: "rematch" })
  }

  // ---------- Quit ----------
  quitBtn.onclick = () => {
    const { playerId } = getSession()

    quitGame(playerId)
    disconnectWebSocket(playerId)

    resetJoinState()

    history.replaceState({}, "", "/")
    window.dispatchEvent(new Event("popstate"))
  }


}
