export function renderTicTacToeGame(app, gameId, playerId) {
    app.innerHTML = `
        <h1>${formatGameName(game)}</h1>
        
        
      `

    document.getElementById('createBtn').onclick = () => startNewGame(game)
    document.getElementById('joinBtn').onclick = () => joinGame(game)

    document.getElementById('back').onclick = () => {
        history.pushState({}, '', '/')
        window.dispatchEvent(new Event('popstate'))
    }
}