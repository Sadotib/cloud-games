import { API_BASE } from "./newgame.js";



let session = {
  gameId: null,
  playerId: null,
  hostId: null
};

export function getSession() {
  return session;
}

let socket = null;
const listeners = [];

export function connectWebSocket(action, gameId, playerId) {
    session.gameId = gameId;
    session.playerId = playerId;
    if (action === "create") {
        session.hostId = playerId;
    }
    const wsBase = API_BASE.replace(/^http/, "ws");
    const wsUrl = `${wsBase}/ws/${action}/${gameId}/${playerId}`;

    console.log("Connecting WebSocket to:", wsUrl);

    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log("WebSocket CONNECTED");
    };

    socket.onclose = () => {
        console.log("WebSocket DISCONNECTED");
    };

    socket.onerror = (err) => {
        console.error("WebSocket ERROR:", err);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "error") {
            alert(data.message);
            return;
        }

        listeners.forEach(fn => fn(data));
    };
}

export function disconnectWebSocket(playerId) {
  if (socket) {
    try {
      socket.onopen = null
      socket.onmessage = null
      socket.onclose = null
      socket.onerror = null

      if (socket.readyState === WebSocket.OPEN) {
        socket.close(1000, `${playerId} closed connection`)
      }
    } catch (e) {
      console.warn("WebSocket cleanup error", e)
    }
  }

  socket = null

  // FULL session reset
  session.gameId = null
  session.playerId = null
  session.hostId = null

  // REMOVE ALL LISTENERS
  listeners.length = 0
}



export function addSocketListener(fn) {
    listeners.push(fn);
}

export function removeSocketListener(fn) {
    const index = listeners.indexOf(fn);
    if (index !== -1) listeners.splice(index, 1);
}

export function sendSocketMessage(data) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("WebSocket not connected");
        return;
    }

    socket.send(JSON.stringify(data));
}
