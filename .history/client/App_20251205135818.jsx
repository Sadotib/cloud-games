import { useState } from "react";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [log, setLog] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [playerId] = useState(() => crypto.randomUUID());
  const [message, setMessage] = useState("");

  function addLog(text) {
    setLog((prev) => [...prev, text]);
  }

  async function startGame() {
    try {
      const res = await fetch("http://localhost:8080/game/create", {
        method: "POST",
      });

      const data = await res.json();
      setGameId(data.gameId);

      addLog(`Created Game: ${data.gameId} (Code: ${data.code})`);

      connectWebSocket(data.gameId);
    } catch (err) {
      addLog("Error creating game: " + err.message);
    }
  }

  function connectWebSocket(id) {
    const wsUrl = `ws://localhost:8080/ws/${id}/${playerId}`;

    addLog("Connecting WS: " + wsUrl);

    const ws = new WebSocket(wsUrl);
    setSocket(ws);

    ws.onopen = () => addLog("WebSocket connected");
    ws.onclose = () => addLog("WebSocket closed");
    ws.onerror = (e) => addLog("WebSocket error: " + e.message);

    ws.onmessage = (event) => {
      addLog("Received: " + event.data);
    };
  }

  function sendMessage() {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      addLog("Cannot send: WebSocket not open");
      return;
    }

    const msg = {
      type: "chat",
      from: playerId,
      text: message,
    };

    socket.send(JSON.stringify(msg));
    addLog("Sent: " + message);
    setMessage("");
  }

  return (
    <div style={styles.container}>
      <h2>Multiplayer Game Client</h2>

      <button style={styles.button} onClick={startGame}>
        Start Game
      </button>

      {gameId && (
        <p>
          <b>Game ID:</b> {gameId}
        </p>
      )}

      <div style={styles.logBox}>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      <div style={styles.chatRow}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  logBox: {
    height: "250px",
    border: "1px solid #ccc",
    background: "#f4f4f4",
    overflowY: "scroll",
    padding: "10px",
    marginBottom: "20px",
  },
  chatRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
};
