import { connectWebSocket } from './websocket.js'
// import { addLog } from './newgame.js'
import { showGameScreen } from '../ui/ui.js';
import { API_BASE } from './newgame.js';

export function joinGame(element) {

    const joinBtn = document.getElementById("joinBtn")
    


    joinBtn.addEventListener("click", async () => {
        const gameId = document.getElementById("gameIdInput").value

        console.log("[CLIENT] Game ID to join:", gameId);

        if (!gameId) {
            alert("No Game ID provided")
            return
        }

        try {
            const url = `${API_BASE}/api/game/join/${gameId}`;
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
            console.log(`[CLIENT] Join response:`, data);
            // addLog("Game joined with ID: " + gameId);

            // connectWebSocket("create", gameId, playerId);

            console.log("[CLIENT] Joining game...");

            try {
                connectWebSocket("join", gameId, playerId);

                // alert(`Game created with ID: ${data.gameId}`);
            } catch (error) {
                console.error("Error joining game:", error);
            }


            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error connecting to game:", error);
        }



    });

}