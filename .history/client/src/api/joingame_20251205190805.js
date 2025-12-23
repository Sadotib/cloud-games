let playerId = "sadotib"
export function joinGame(element) {
    const gameId = document.getElementById("gameIdInput").value
    const joinBtn = document.getElementById("joinBtn")
    joinBtn.addEventListener("click", async () => {
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