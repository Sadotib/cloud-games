import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { startNewGame } from './newgame.js'

document.querySelector('#app').innerHTML = `
  <div>
    <button id="startBtn">Start Game</button>

    <div style="margin-top:20px;">
      <input id="msgInput" placeholder="Type message..." />
      <button id="sendBtn">Send</button>
    </div>

    <pre id="log" style="
      margin-top:20px;
      border:1px solid #ccc;
      padding:10px;
      height:200px;
      overflow-y:auto;
      background:#f7f7f7;
    "></pre>

    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))

const startBtn = document.getElementById("startBtn")
startNewGame(startBtn)