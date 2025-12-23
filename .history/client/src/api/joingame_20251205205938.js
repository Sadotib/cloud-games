import { connectWebSocket } from './websocket.js'
import { addLog } from './newgame.js'

let playerId = "sadotib"
export function joinGame(element) {

    const joinBtn = document.getElementById("joinBtn")

    

    joinBtn.addEventListener("click", async () => {
        const gameId = document.getElementById("gameIdInput").value

        console.log("Game ID to join:", gameId);

        if (!gameId) {
            alert("No Game ID provided")
            return
        }

        console.log("Joining game...");
        addLog("Joining game...");

        try {
            connectWebSocket("join",gameId, playerId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error joining game:", error);
        }
    });

}