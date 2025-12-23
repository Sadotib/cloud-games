import { showGameScreen } from "../ui.js"
import { connectWebSocket } from "./websocket.js"


// let playerId = "bitopan"

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
            playerId := data[playerId]
            console.log("Game created:", data[gameId]);
            addLog("Game created with ID: " + data.gameId);

            const gameId = data.gameId;

            connectWebSocket("create", gameId, playerId);
            
            
            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}




