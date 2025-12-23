// function App() {

//   return (
//     <>
//       <button>Start Game</button>
//     </>
//   )
// }

// export default App

import { useState } from "react";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const playerId = crypto.randomUUID();

  const addLog = (msg: string) =>
    setLog((prev) => [...prev, msg]);

  async function startGame() {
    try {
      const res = await fetch("http://localhost:8080/game/create", {
        method: "POST",
      });

      const data = await res.json();
      setGameId(data.gameId);

      addLog(`Created game: ${data.gameId}`);
      connectWebSocket(data.gameId);
    } catch (err) {
      addLog("Error creating game: " + err);
    }
  }

  function connectWebSocket(id: string) {
    const url = `ws://localhost:8080/ws/${id}/${playerId}`;
    addLog("Connecting to " + url);

    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => addLog("WebSocket connected");
    ws.onclose = () => addLog("WebSocket disconnected");
    ws.onerror = (error) => addLog("WebSocket error: " + error);

    ws.onmessage = (event) => {
      addLog("Received: " + event.data);
    };
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cloud Game</h1>

      <button onClick={startGame}>Start Game</button>

      {gameId && <p>Game ID: {gameId}</p>}

      <div
        style={{
          marginTop: 20,
          padding: 10,
          border: "1px solid #ccc",
          height: 200,
          overflowY: "auto",
        }}
      >
        {log.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
