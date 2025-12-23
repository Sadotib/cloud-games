export function renderHome(app) {
  app.innerHTML = `
    <h1 class="font-semibold text-center bebas-neue-regular gradient-text hero-title">
      Cloud Games
    </h1>
    <h3>Play simple fun games with friends in your browser!</h3>

    <div class="grid">
      <div class="game-tile" data-game="tictactoe">
        <img src="/tictactoe.svg" />
        <div class="game-label">Tic Tac Toe</div>
      </div>

      <div class="game-tile" data-game="rps">
        <img src="/rps.svg" />
        <div class="game-label">Rock Paper Scissors</div>
      </div>

      <div class="game-tile" data-game="chopsticks">
        <img src="/chopsticks.svg" />
        <div class="game-label">Rock Paper Scissors</div>
      </div>
    </div>
  `

  document.querySelectorAll('.game-tile').forEach(tile => {
    tile.onclick = () => {
      const game = tile.dataset.game
      history.pushState({}, '', `/game/${game}`)
      window.dispatchEvent(new Event('popstate'))
    }
  })
}
