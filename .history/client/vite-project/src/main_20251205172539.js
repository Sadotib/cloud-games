import './style.css'
// import { setupCounter } from './counter.js'
// import { startNewGame } from './newgame.js'

document.querySelector('#app').innerHTML = `
  <div>
    <button id="startBtn">Start Game</button>

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
      <input id="msgInput" placeholder="Type message..." />
      <button id="sendBtn">Send</button>
    </div>

  </div>
`

// startNewGame(document.querySelector('#startBtn'))

let socket = null
let playerId = crypto.randomUUID()

const startBtn = document.getElementById("startBtn")
const sendBtn = document.getElementById("sendBtn")
const logBox = document.getElementById("log")

function addLog(msg) {
  logBox.textContent += msg + "\n"
  logBox.scrollTop = logBox.scrollHeight
}

// STEP 1: Create game using API
startBtn.addEventListener("click", async () => {
  addLog("Creating game...")

  try {
    const response = await fetch("http://localhost:8080/game/create/", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()
    addLog("Game created: " + JSON.stringify(data))

    const gameId = data.gameId
    connectWebSocket(gameId)
  } catch (error) {
    addLog("Error creating game: " + error)
  }
})

// STEP 2: Connect WebSocket after creation
function connectWebSocket(gameId) {
  const wsUrl = `ws://localhost:8080/ws/${gameId}/${playerId}`
  addLog("Connecting WebSocket → " + wsUrl)

  socket = new WebSocket(wsUrl)

  socket.onopen = () => addLog("WebSocket CONNECTED")
  socket.onclose = () => addLog("WebSocket DISCONNECTED")
  socket.onerror = (err) => addLog("WebSocket ERROR: " + err)
  socket.onmessage = (event) => addLog("Received → " + event.data)
}

// STEP 3: Send a WebSocket message
sendBtn.addEventListener("click", () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    addLog("Cannot send message: WebSocket not open")
    return
  }

  const text = document.getElementById("msgInput").value
  const msg = JSON.stringify({
    type: "chat",
    from: playerId,
    text: text
  })

  socket.send(msg)
  addLog("Sent → " + text)
})