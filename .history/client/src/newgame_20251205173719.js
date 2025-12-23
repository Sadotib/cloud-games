let playerId = "bitopan";

// Utility logging
function addLog(msg) {
    const logBox = document.getElementById("log");
    const finalMsg = `[${new Date().toLocaleTimeString()}] ${msg}`;
    console.log(finalMsg);
    logBox.textContent += finalMsg + "\n";
    logBox.scrollTop = logBox.scrollHeight;
}

export function startNewGame() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", async () => {
        addLog("BUTTON CLICK: Start Game");
        addLog("Attempting HTTP request to create new game...");

        try {
            const response = await fetch("http://localhost:8080/game/create/", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            addLog(`HTTP RESPONSE STATUS: ${response.status}`);

            if (!response.ok) {
                addLog("❌ ERROR: Server responded with non-OK status");
                return;
            }

            const data = await response.json();
            addLog("Game created → " + JSON.stringify(data));

            const gameId = data.gameId;
            addLog("Extracted gameId → " + gameId);

            connectWebSocket(gameId);

        } catch (error) {
            addLog("❌ FATAL ERROR: Failed to create game → " + error);
            console.error(error);
        }
    });
}

// STEP 2: Connect WebSocket after creation
function connectWebSocket(gameId) {
    const wsUrl = `ws://localhost:8080/ws/${gameId}/${playerId}`;
    addLog("Attempting WebSocket connection → " + wsUrl);

    let socket;

    try {
        socket = new WebSocket(wsUrl);
    } catch (err) {
        addLog("❌ ERROR: Could not create WebSocket object → " + err);
        return;
    }

    // Log readyState transitions
    const logReadyState = () => {
        addLog(`WebSocket readyState = ${socket.readyState} (${[
            "CONNECTING",
            "OPEN",
            "CLOSING",
            "CLOSED"
        ][socket.readyState]})`);
    };

    logReadyState();

    socket.onopen = () => {
        addLog("✅ WebSocket OPENED successfully!");
        logReadyState();
    };

    socket.onerror = (event) => {
        addLog("❌ WebSocket ERROR triggered");
        console.log(event);
        logReadyState();

        // Try to detect common errors
        detectWebSocketError();
    };

    socket.onclose = (event) => {
        addLog(`⚠️ WebSocket CLOSED → code: ${event.code}, reason: ${event.reason}`);
        logReadyState();

        if (event.code === 1006) {
            addLog("❌ ERROR 1006: Abnormal Closure → Server unreachable / upgrade failed / CORS issue");
        }
        if (event.code === 1002) {
            addLog("❌ ERROR 1002: Protocol error → Your WS route might be wrong");
        }
        if (event.code === 1008) {
            addLog("❌ ERROR 1008: Policy Violation (CORS or auth middleware)");
        }
    };

    socket.onmessage = (event) => {
        addLog("📩 Received → " + event.data);
    };

    // Detect specific types of WS connection errors
    function detectWebSocketError() {
        fetch(wsUrl.replace("ws://", "http://"), { method: "GET" })
            .then(res => {
                addLog("WS-ROUTE CHECK: HTTP response status = " + res.status);
                if (res.status === 404) addLog("❌ WS Route 404: /ws/... endpoint NOT found on backend!");
                if (res.status === 403) addLog("❌ WS Route 403: Forbidden → CORS/AUTH blocking WS upgrade");
            })
            .catch(err => {
                addLog("❌ WS-ROUTE CHECK FAILED: Backend not reachable → " + err);
            });
    }

    // STEP 3: Send a chat message via WS
    const sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", () => {
        logReadyState();

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            addLog("❌ Cannot send message → WebSocket is not OPEN");
            return;
        }

        const text = document.getElementById("msgInput").value;
        const msg = JSON.stringify({
            type: "chat",
            from: playerId,
            text: text
        });

        socket.send(msg);
        addLog("➡️ Sent → " + text);
    });
}
