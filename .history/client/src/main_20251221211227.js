import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'


document.querySelector('#app').innerHTML = `
  <div>
    h1>Cloud Game Client</h1>

  </div>
`

startNewGame()      

joinGame()

