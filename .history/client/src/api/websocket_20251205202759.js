import { addLog } from "./newgame.js"
import { showGameScreen } from "../ui/gamescreen.js"


let socket = null;

export function connectWebSocket(gameId, playerId) {

    const wsUrl = `ws://localhost:8080/ws/${gameId}/${playerId}`
    addLog("Connecting WebSocket → " + wsUrl)

    socket = new WebSocket(wsUrl)

    socket.onopen = () => {
        
        addLog("WebSocket CONNECTED")
    
        showGameScreen(gameId, playerId);   // ⬅ open game screen here!
    }
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

export function disconnectWebSocket(playerId) {
    if (!socket) {
        console.log("No active WebSocket to disconnect");
        addLog("No active WebSocket to disconnect");
        return;
    }

    if (socket.readyState === WebSocket.OPEN) {
        socket.close(1000, `${playerId} closed connection`);
        console.log(`WebSocket CLOSED by ${playerId}`);
        addLog(`WebSocket CLOSED by ${playerId}`);
    } else {
        console.log("WebSocket was not open");
        addLog("WebSocket was not open");
    }

    socket = null; // optional: cleanup
}