import { addLog } from "./newgame.js"

export function connectWebSocket(gameId, playerId) {

    const wsUrl = `ws://localhost:8080/ws/${gameId}/${playerId}`
    addLog("Connecting WebSocket → " + wsUrl)

    let socket = new WebSocket(wsUrl)

    socket.onopen = () => addLog("WebSocket CONNECTED")
    socket.onclose = () => addLog("WebSocket DISCONNECTED")
    socket.onerror = (err) => addLog("WebSocket ERROR: " + err)
    socket.onmessage = (event) => addLog("Received → " + event.data)

    // // STEP 3: Send a WebSocket message
    // sendBtn.addEventListener("click", () => {
    //     if (!socket || socket.readyState !== WebSocket.OPEN) {
    //         addLog("Cannot send message: WebSocket not open")
    //         return
    //     }

    //     const text = document.getElementById("msgInput").value
    //     const msg = JSON.stringify({
    //         type: "chat",
    //         from: playerId,
    //         text: text
    //     })

    //     socket.send(msg)
    //     addLog("Sent → " + text)
    // })  
}

export function disconnectWebSocket(socket, playerId) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(1000, `${playerId} disconnecting`)
        addLog("WebSocket DISCONNECTED by client")
    } else {
        addLog("Cannot disconnect: WebSocket not open")
    }
}