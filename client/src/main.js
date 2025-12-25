import './style.css'
import { renderHome } from './ui/home.js'
import { renderGameHome } from './ui/gameHome.js'
import { renderTicTacToeGame } from './ui/tictactoe.js'

const app = document.querySelector('#app')

function router() {
  const path = window.location.pathname

  if (path === '/' || path === '') {
    renderHome(app)
    return
  }

  // 👉 ACTUAL GAME SCREEN
  if (path === '/game/tictactoe/play') {
    renderTicTacToeGame(app)
    return
  }

  // 👉 LOBBY SCREEN
  if (path === '/game/tictactoe') {
    renderGameHome(app, 'tictactoe')
    return
  }

  app.innerHTML = `<h2>404 – Page not found</h2>`
}

// handle back/forward
window.addEventListener('popstate', router)

// initial render
router()
