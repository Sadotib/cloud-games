package server

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) HelloTestHandler(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello World"})
}

func (s *Server) CreateGameHandler(c *gin.Context) {

	// playerId := c.Param("playerId")
	gameId := roomIdGenerator(6)
	playerId := playerIdGenerator()
	fmt.Printf("%s", gameId)

	c.Header("content-type", "application/json")

	c.JSON(http.StatusOK, gin.H{
		"gameId":   gameId,
		"playerId": playerId,
	})
}

func (s *Server) JoinGameHandler(c *gin.Context) {

	// playerId := c.Param("playerId")
	gameId := c.Query("gameId")
	playerId := playerIdGenerator()
	fmt.Printf("%s", gameId)
	c.Header("content-type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"gameId":   gameId,
		"playerId": playerId,
	})
}

//WebSocketHandler is in websocket.go

// func (s *Server) V1Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v1"})
// }

// func (s *Server) V2Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v2"})
// }
