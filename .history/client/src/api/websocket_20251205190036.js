// STEP 2: Connect WebSocket after creation
export function connectWebSocket(gameId) {
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