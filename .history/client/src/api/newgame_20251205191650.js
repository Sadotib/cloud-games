import { connectWebSocket } from "./websocket.js"


let playerId = "bitopandas"

export function addLog(msg) {
    const logBox = document.getElementById("log")
    logBox.textContent += msg + "\n"
    logBox.scrollTop = logBox.scrollHeight
}

export function startNewGame() {
    const startBtn = document.getElementById("startBtn")
    startBtn.addEventListener("click", async () => {
        console.log("Starting game...");
        addLog("Starting game...");

        try {
            const response = await fetch("http://localhost:8080/game/create/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("Game created:", data);
            addLog("Game created with ID: " + data.gameId);

            const gameId = data.gameId;

            console.log("WebSocket " + gameId + " connected. " + playerId);
            connectWebSocket(gameId, playerId);
            

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}




