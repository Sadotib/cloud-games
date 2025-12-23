let playerId = "bitopan"


// const sendBtn = document.getElementById("sendBtn")


export function addLog(msg) {
    const logBox = document.getElementById("log")
    logBox.textContent += msg + "\n"
    logBox.scrollTop = logBox.scrollHeight
    console.log(msg)
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

            connectWebSocket(gameId);

            // alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    });

}

// STEP 2: Connect WebSocket after creation
function connectWebSocket(gameId) {
    const wsUrl = `ws://localhost:8080/ws/${gameId}/${playerId}`
    addLog("Connecting WebSocket → " + wsUrl)

    let socket = new WebSocket(wsUrl)

    socket.onopen = () => addLog("WebSocket CONNECTED")
    socket.onclose = () => addLog("WebSocket DISCONNECTED")
    socket.onerror = (err) => addLog("WebSocket ERROR: " + err)
    socket.onmessage = (event) => addLog("Received → " + event.data)
}

