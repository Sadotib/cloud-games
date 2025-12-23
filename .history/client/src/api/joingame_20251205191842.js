import { connectWebSocket } from './websocket.js'
import { addLog } from './newgame.js'

let playerId = "sadotib"
export function joinGame(element) {
    const gameId = document.getElementById("gameIdInput").value
    const joinBtn = document.getElementById("joinBtn")

    console.log("Game ID to join:", gameId);

    joinBtn.addEventListener("click", async () => {
        if (!gameId) {
            alert("No Game ID provided")
            return
        }

        console.log("Joining game...");
        addLog("Joining game...");

        try {
            connectWebSocket(gameId, playerId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error joining game:", error);
        }
    });

}