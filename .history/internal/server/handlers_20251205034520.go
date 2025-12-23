package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) V1Hello(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello from v1"})
}

func (s *Server) V2Hello(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Hello from v2"})
}
