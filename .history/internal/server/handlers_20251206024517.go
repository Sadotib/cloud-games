package server

import "github.com/gin-gonic/gin"

func (s *Server) HelloTestHandler(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello World"})
}

// func (s *Server) V1Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v1"})
// }

// func (s *Server) V2Hello(c *gin.Context) {
// 	c.JSON(200, gin.H{"message": "Hello from v2"})
// }
