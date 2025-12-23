package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

upgrader := websocket.

func (s *Server) WebSocketHandler(c *gin.Context){
	// Placeholder for WebSocket handler logic
	gameId := c.Param("gameId")
	playerId := c.Param("playerId")


}

