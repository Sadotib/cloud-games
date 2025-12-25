package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		// AllowOrigins: []string{"http://localhost:5173"}, // Add your frontend URL
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable cookies/auth
		AllowWebSockets:  true,
	}))

	// API
	api := router.Group("/api")
	{
		api.GET("/game/create", s.CreateGameHandler)
		api.GET("/game/join/:gameId", s.JoinGameHandler)
	}

	// WebSocket route
	router.GET("/ws/:action/:gameId/:playerId", s.WebSocketHandler)

	// Game routes
	// router.GET("/game/create/", s.CreateGameHandler)
	// router.GET("/game/join/:gameId", s.JoinGameHandler)

	// v1 := router.Group("/ping/v1")
	// {
	// 	v1.GET("/hello", s.V1Hello)
	// }
	// v2 := router.Group("/ping/v2")
	// {
	// 	v2.GET("/hello", s.V2Hello)
	// }

	// ---- FRONTEND (NO wildcard conflict) ----
	router.Static("/assets", "./client/dist/assets")

	router.GET("/", func(c *gin.Context) {
		c.File("./client/dist/index.html")
	})

	router.NoRoute(func(c *gin.Context) {
		c.File("./client/dist/index.html")
	})

	return router.Handler()
}
