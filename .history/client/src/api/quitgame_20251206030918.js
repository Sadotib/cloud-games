import { connectWebSocket, disconnectWebSocket } from './websocket.js'
import { addLog } from './newgame.js'
import { showHomeScreen } from '../ui.js';

export function quitGame(playerId) {

    const quitBtn = document.getElementById("quitBtn")

    quitBtn.addEventListener("click", async () => {
        console.log("Quitting game...");

        try {
            disconnectWebSocket(playerId);
            showHomeScreen();
            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error quitting game:", error);
        }
    });

}