import { connectWebSocket } from './websocket.js'
// import { addLog } from './newgame.js'
import { showGameScreen } from '../ui/ui.js';
import { API_BASE } from './newgame.js';
import { showGameHomeScreen } from '../ui/ui.js'

let joined = false;
export function resetJoinState() {
  joined = false;
}

export function joinGame(element) {




    const joinBtn = document.getElementById("joinBtn")
    


    joinBtn.addEventListener("click", async () => {
        if (joined) return;
        joined = true;
        joinBtn.disabled = true;

        const gameId = document.getElementById("gameIdInput").value

        console.log("Game ID to join:", gameId);

        if (!gameId) {
            alert("No Game ID provided")
            return
        }

        try {
            const response = await fetch(`${API_BASE}/game/join/${gameId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            const playerId = data.playerId;
            console.log("Game created:", gameId, "Player ID:", playerId);
            // addLog("Game joinded with ID: " + gameId);



            // connectWebSocket("create", gameId, playerId);

            console.log("Joining game...");

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