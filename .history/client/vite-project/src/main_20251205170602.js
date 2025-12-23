import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { startNewGame } from './newgame.js'

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
    "></pre>

    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))


startNewGame(document.querySelector('#startBtn'))