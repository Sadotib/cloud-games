let ws = null

export function connectWS(gameId, playerId, action) {
  ws = new WebSocket(
    `ws://localhost:8080/ws/${action}/${gameId}/${playerId}`
  )
  return ws
}

export function getWS() {
  return ws
}
