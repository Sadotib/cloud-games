export function renderBoard(ws) {
  const boardDiv = document.getElementById('board')
  const status = document.getElementById('status')

  boardDiv.style.display = 'grid'
  boardDiv.style.gridTemplateColumns = 'repeat(3, 100px)'

  const cells = []

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.style.border = '1px solid white'
    cell.style.height = '100px'
    cell.style.fontSize = '64px'
    cell.style.textAlign = 'center'
    cell.style.cursor = 'pointer'

    cell.onclick = () => {
      ws.send(JSON.stringify({ type: 'move', index: i }))
    }

    cells.push(cell)
    boardDiv.appendChild(cell)
  }

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)

    if (data.type === 'game_state') {
      data.board.forEach((v, i) => {
        cells[i].textContent = v
      })

      if (data.winner) {
        status.textContent =
          data.winner === 'draw'
            ? 'Draw!'
            : 'Game Over'
      }
    }
  }
}
