// import { showGameScreen } from "../ui.js"
import { connectWebSocket } from "./websocket.js"


// let playerId = "bitopan"

// export function addLog(msg) {
//     const logBox = document.getElementById("log")
//     logBox.textContent += msg + "\n"
//     logBox.scrollTop = logBox.scrollHeight
// }

export const API_BASE = `${location.protocol}//${location.hostname}:8080`;
console.log("[CLIENT] API_BASE:", API_BASE);

export function createNewGame() {
    const startBtn = document.getElementById("createBtn")
    startBtn.addEventListener("click", async () => {
        console.log("[CLIENT] Starting game...");
        // addLog("Starting game...");

        try {
            const url = `${API_BASE}/api/game/create`;
            console.log(`[CLIENT] Sending fetch to: ${url}`);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(`[CLIENT] Response status:`, response.status);
            const data = await response.json();
            const playerId = data.playerId;
            console.log(`[CLIENT] Create response:`, data);
            // addLog("Game created with ID: " + data.gameId);

            const gameId = data.gameId;

            connectWebSocket("create", gameId, playerId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creatin game:", error);
        }
    });

}




