import './style.css'
import { startNewGame } from './api/newgame.js'
import { joinGame } from './api/joingame.js'


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Cloud Games</h1>
    <h3>Play games in your browser!</h3>

  </div>
`

startNewGame()      

joinGame()

