import { formatGameName } from '../utils/gameHome.js'

export function renderTicTacToeGame(app, gameId, playerId) {
    app.innerHTML = `
        <h1>${formatGameName(game)}</h1>
        <div class="card">
              <h2>Game ID: ${gameId}</h2>
            <h3>Player ID: ${playerId}</h3>
            
            <div id="roomStatus" style="white-space: pre-wrap; border: 1px solid #ccc; height: 300px; overflow-y: scroll; margin-top: 10px;">
            </div>
          
        </div>
    
        <button id="quitBtn">Quit Game</button>
        
      `

    document.getElementById('createBtn').onclick = () => startNewGame(game)
    document.getElementById('joinBtn').onclick = () => joinGame(game)

    document.getElementById('back').onclick = () => {
        history.pushState({}, '', '/')
        window.dispatchEvent(new Event('popstate'))
    }
}