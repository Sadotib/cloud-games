// import { showGameScreen } from "../ui.js"
import { connectWebSocket } from "./websocket.js"


// let playerId = "bitopan"

// export function addLog(msg) {
//     const logBox = document.getElementById("log")
//     logBox.textContent += msg + "\n"
//     logBox.scrollTop = logBox.scrollHeight
// }

export function createNewGame() {
    const startBtn = document.getElementById("createBtn")
    startBtn.addEventListener("click", async () => {
        console.log("Starting game...");
        // addLog("Starting game...");

        const API_BASE = `${location.protocol}//${location.hostname}:8080`;


        try {
            const response = await fetch(`${API_BASE}:8080/game/create/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            const playerId = data.playerId;
            console.log("Game created:", data.gameId, "Player ID:", playerId);
            // addLog("Game created with ID: " + data.gameId);

            const gameId = data.gameId;

            connectWebSocket("create", gameId, playerId);
            
            
            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}




