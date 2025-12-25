// import { addLog } from "./newgame.js"
import { showGameScreen } from "../ui/ui.js"
import { updateRoomStatusUI } from "../ui/ui.js"


let socket = null;

export function connectWebSocket(action, gameId, playerId) {

    const wsUrl = `ws://${API_BASE}:8080/ws/${action}/${gameId}/${playerId}`
    console.log("Connecting WebSocket to:", wsUrl);
    // addLog("Connecting WebSocket → " + wsUrl)

    socket = new WebSocket(wsUrl)

    socket.onopen = () => {

        // addLog("WebSocket CONNECTED")
        console.log("WebSocket CONNECTED");

        showGameScreen(gameId, playerId);   // ⬅ open game screen here!
    }
    socket.onclose = () => console.log("WebSocket DISCONNECTED")
    socket.onerror = (err) => console.log("WebSocket ERROR: " + err)
    socket.onmessage = (event) => {

        console.log("WebSocket message event:", event);
        console.log("WebSocket message data (raw):", event.data);
        const data = JSON.parse(event.data);
        console.log("WebSocket message data:", data);
        
        if (data.type === "room_status") {
            updateRoomStatusUI(data);
            return;
        }
        // addLog("Received → " + event.data)
        console.log("Received → " + event.data);
    }
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
        // addLog("No active WebSocket to disconnect");
        return;
    }

    if (socket.readyState === WebSocket.OPEN) {
        socket.close(1000, `${playerId} closed connection`);
        console.log(`WebSocket CLOSED by ${playerId}`);
    } else {
        console.log("WebSocket was not open");
        // addLog("WebSocket was not open");
    }

    socket = null; // optional: cleanup
}