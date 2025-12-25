package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// CheckOrigin: func(r *http.Request) bool {
	// 	return true // allow all websocket connections
	// },
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		log.Println("WS Origin:", origin)
		allowedOrigins := map[string]bool{
			"http://localhost:5173": true,
			"http://127.0.0.1:5173": true,
			origin:                  true, // Allow dynamic origins for testing
		}

		return allowedOrigins[origin]
	},
}

func init() {
	log.Println("websocket.go loaded")
}

func (s *Server) WebSocketHandler(c *gin.Context) {

	// Placeholder for WebSocket handler logic
	action := c.Param("action")
	gameId := c.Param("gameId")
	playerId := c.Param("playerId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil) //upgrade HTTP connection to WebSocket
	if err != nil {
		log.Println(err)
		return
	}

	var room *GameRoom
	var roomExists bool

	switch action { // create or join game room
	case "create":
		room = CreateRoom(gameId)
		room.HostID = playerId
		log.Println("Room created with ID:", room.ID)
		// conn.WriteMessage(websocket.TextMessage, []byte("Room created"))

	case "join":
		room, roomExists = JoinRoom(gameId)
		if room == nil || !roomExists {
			log.Println("Room with ID", gameId, "does not exist")
			conn.WriteMessage(websocket.TextMessage, []byte("Room does not exist"))
			conn.Close()
			return
		}
		log.Println("Joined room with ID:", room.ID)
	}

	// Add player to room
	if _, exists := room.Players[playerId]; exists {
		return
	}
	room.Players[playerId] = &Player{
		ID:   playerId,
		Conn: conn,
	}
	if len(room.Players) == 1 {
		room.Turn = playerId // first player starts
	}

	noOfPlayers := len(room.Players)
	fmt.Printf("Number of plyers in room %s: %d\n", room.ID, noOfPlayers)
	fmt.Printf("%d", noOfPlayers)

	broadcastRoomStatus(room) // Notify all players about the updated room status

	log.Println("Player", playerId, "joined room", gameId)

	// Start listening to messages from this player
	go handlePlayerMessages(room, playerId, conn)

}

func handlePlayerMessages(room *GameRoom, playerId string, conn *websocket.Conn) {
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Player disconnected:", playerId)

			delete(room.Players, playerId)

			// If game is active and a player leaves, kill the game
			if room.Started && len(room.Players) < 2 {
				broadcastPlayerLeft(room)
			} else {
				broadcastRoomStatus(room)
			}

			return
		}

		var data map[string]interface{}
		if err := json.Unmarshal(msg, &data); err != nil {
			continue
		}

		switch data["type"] {

		case "start_game":
			if playerId == room.HostID && !room.Started {
				room.Started = true

				// Initialize first turn if not already set
				if room.Turn == "" {
					room.Turn = room.HostID
				}

				broadcastGameStarted(room)
				broadcastGameState(room) // 🔥 REQUIRED
			}
		case "rematch":
			if len(room.Players) < 2 {
				return
			}
			room.RematchCount++

			room.Board = [9]string{}
			room.Winner = ""
			room.Started = true

			if room.RematchCount%2 == 1 {
				// non-host starts
				for id := range room.Players {
					if id != room.HostID {
						room.Turn = id
						break
					}
				}
			} else {
				// host starts
				room.Turn = room.HostID
			}

			broadcastGameState(room)

		case "move":
			if room.Winner != "" || room.Turn != playerId {
				continue
			}

			index := int(data["index"].(float64))
			if room.Board[index] != "" {
				continue
			}

			symbol := "X"
			if playerId != room.HostID {
				symbol = "O"
			}

			room.Board[index] = symbol
			room.Turn = getNextPlayer(room, playerId)
			room.Winner = checkWinner(room)

			broadcastGameState(room)
		}
	}
}

func broadcastPlayerLeft(room *GameRoom) {
	msg := map[string]interface{}{
		"type": "player_left",
	}

	data, _ := json.Marshal(msg)

	for _, p := range room.Players {
		p.Conn.WriteMessage(websocket.TextMessage, data)
	}
}

func broadcastGameStarted(room *GameRoom) {
	msg := map[string]interface{}{
		"type": "game_started",
	}
	data, _ := json.Marshal(msg)

	for _, p := range room.Players {
		p.Conn.WriteMessage(websocket.TextMessage, data)
	}
}

func getNextPlayer(room *GameRoom, current string) string {
	for id := range room.Players {
		if id != current {
			return id
		}
	}
	return ""
}

func checkWinner(room *GameRoom) string {
	b := room.Board
	lines := [8][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
		{0, 4, 8}, {2, 4, 6},
	}

	for _, l := range lines {
		if b[l[0]] != "" && b[l[0]] == b[l[1]] && b[l[1]] == b[l[2]] {
			for id := range room.Players {
				if (b[l[0]] == "X" && id == room.HostID) ||
					(b[l[0]] == "O" && id != room.HostID) {
					return id
				}
			}
		}
	}

	for _, v := range b {
		if v == "" {
			return ""
		}
	}

	return "draw"
}

func broadcastGameState(room *GameRoom) {
	turnSymbol := ""
	winnerSymbol := ""

	if room.Turn != "" {
		if room.Turn == room.HostID {
			turnSymbol = "X"
		} else {
			turnSymbol = "O"
		}
	}

	if room.Winner == "draw" {
		winnerSymbol = "draw"
	} else if room.Winner != "" {
		if room.Winner == room.HostID {
			winnerSymbol = "X"
		} else {
			winnerSymbol = "O"
		}
	}

	msg := map[string]interface{}{
		"type":   "game_state",
		"board":  room.Board,
		"turn":   turnSymbol,
		"winner": winnerSymbol,
	}

	data, _ := json.Marshal(msg)
	log.Printf(
		"GAME_STATE | room=%s turn=%s winner=%s",
		room.ID,
		room.Turn,
		room.Winner,
	)
	log.Println("WS SEND:", string(data))

	for _, p := range room.Players {
		p.Conn.WriteMessage(websocket.TextMessage, data)
	}

}

func broadcastToRoom(room *GameRoom, sender string, msg []byte) {
	for id, p := range room.Players {
		if id == sender {
			continue
		}
		p.Conn.WriteMessage(websocket.TextMessage, msg)
	}
}

func broadcastRoomStatus(room *GameRoom) {
	players := []string{}
	for id := range room.Players {
		players = append(players, id)
	}

	statusMsg := map[string]interface{}{
		"type":        "room_status",
		"playerCount": len(players),
		"players":     players,
	}

	msgBytes, _ := json.Marshal(statusMsg)

	for _, p := range room.Players {
		p.Conn.WriteMessage(websocket.TextMessage, msgBytes)
	}
}

func (room *GameRoom) BoardSymbolFor(playerId string) string {
	if playerId == room.HostID {
		return "X"
	}
	return "O"
}
