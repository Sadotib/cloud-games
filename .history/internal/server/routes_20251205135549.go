package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Add your frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable cookies/auth
	}))

	// Basic route
	router.GET("/", s.HelloTestHandler)

	// WebSocket route
	router.GET("/ws/:gameId/:playerId", s.WebSocketHandler)

	// Game routes
	router.GET("/game/create/", s.CreateGameHandler)

	// v2 := router.Group("/ping/v2")
	// {
	// 	v2.GET("/hello", s.V2Hello)
	// }

	return router.Handler()
}

func (s *Server) HelloTestHandler(c *gin.Context) {
	c.Header("content-type", "application/xhtml+xml")
	c.HTML(http.StatusOK, "./client/index.html", nil)
}

// func (s *Server) V1Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v1"})
// }

// func (s *Server) V2Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v2"})
// }
