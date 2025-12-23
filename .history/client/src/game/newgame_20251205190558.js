import { connectWebSocket } from "../websocket.js"


let playerId = "bitopan"

function addLog(msg) {
    const logBox = document.getElementById("log")
    logBox.textContent += msg + "\n"
    logBox.scrollTop = logBox.scrollHeight
}

export function startNewGame(element) {
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
            addLog("Game created with ID: " + JSON.stringify(data));

            const gameId = data.gameId;

            connectWebSocket(gameId, playerId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    });

}




