package server

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (s *Server) WebSocketHandler(c *gin.Context) {
	// Placeholder for WebSocket handler logic
	gameId := c.Param("gameId")
	playerId := c.Param("playerId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	room := GetOrCreateRoom(gameId)

	// Add player to room
	room.Players[playerId] = &Player{
		ID:   playerId,
		Conn: conn,
	}

	log.Println("Player", playerId, "joined room", gameId)

	// Start listening to messages from this player
	go handlePlayerMessages(room, playerId, conn)

}
