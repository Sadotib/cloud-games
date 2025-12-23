import './style.css'
import { renderHome } from './ui/home.js'
import { renderGameHome } from './ui/gameHome.js'

const app = document.querySelector('#app')
const gameScreen =document.querySelector('#game')

function router() {
  const path = window.location.pathname

  if (path === '/' || path === '') {
    renderHome(app)
  } else if (path.startsWith('/game/')) {
    const game = path.split('/')[2]
    renderGameHome(gameScreen, game)
  } else {
    app.innerHTML = `<h2>404 – Page not found</h2>`
  }
}

// handle back/forward
window.addEventListener('popstate', router)

// initial render
router()
