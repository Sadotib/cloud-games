package server

import (
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

}
