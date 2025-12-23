import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { startNewGame } from './newgame.js'

document.querySelector('#app').innerHTML = `
  <div>
    <button id="startBtn">Start Game</button>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))


startNewGame(document.querySelector('#startBtn'))