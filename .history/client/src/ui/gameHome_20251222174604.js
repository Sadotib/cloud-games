import { startNewGame } from '../api/newgame.js'
import { joinGame } from '../api/joingame.js'

export function renderGameHome(app, game) {
    switch (game) {
        case 'tictactoe':
            app.innerHTML = `
                <h1>${formatGameName(game)}</h1>
                <div class="card">
                    <button id="createBtn">Create Game</button>             
                    <div style="margin-top:20px;">
                        <input id="gameIdInput" placeholder="Enter Game ID" />
                        <button id="joinBtn">Join Game</button>
                    </div>
                </div>
                <button id="back">← Back</button> 
            `
            document.getElementById('createBtn').onclick = () => startNewGame(game)
            document.getElementById('joinBtn').onclick = () => joinGame(game)

            document.getElementById('back').onclick = () => {
                history.pushState({}, '', '/')
                window.dispatchEvent(new Event('popstate'))
            }
    }
}

export function formatGameName(game) {
    return game === 'tictactoe'
        ? 'Tic Tac Toe'
        : 'Rock Paper Scissors'
}
