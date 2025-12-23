export function renderTicTacToeGame(app, gameId, playerId) {
    app.innerHTML = `
        <div>
            <h2>Game ID: ${gameId}</h2>
            <h3>Player ID: ${playerId}</h3>
            <button id="quitBtn">Quit Game</button>
            <div id="roomStatus" style="white-space: pre-wrap; border: 1px solid #ccc; height: 300px; overflow-y: scroll; margin-top: 10px;"></div>
        </div>
    `
}