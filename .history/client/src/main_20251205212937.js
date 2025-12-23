import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'
import { quitGame } from './api/quitgame.js'

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
      <input id="gameIdInput" placeholder="Enter Game ID" />
      <button id="joinBtn">JOIN</button>
    </div>

  </div>
`

startNewGame()

joinGame()

quitGame()