import { connectWebSocket, disconnectWebSocket } from './websocket.js'
import { addLog } from './newgame.js'

let playerId = "sadotib"
export function quitGame() {

    const quitBtn = document.getElementById("quitBtn")

    quitBtn.addEventListener("click", async () => {
        console.log("Quitting game...");
        addLog("Quitting game...");

        try {
            disconnectWebSocket(playerId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error quitting game:", error);
        }
    });

}