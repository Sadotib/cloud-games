package server

import (
	"strings"

	"github.com/gin-gonic/gin"
)

func generateGameId(n int) string {
	sb := strings.Builder{}
	sb.Grow(n)

}

// Source - https://stackoverflow.com/a
// Posted by icza, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-05, License - CC BY-SA 4.0

func RandStringBytesMaskImprSrcSB(n int) string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	sb := strings.Builder{}
	sb.Grow(n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			sb.WriteByte(letterBytes[idx])
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return sb.String()
}

func (s *Server) CreateGameHandler(c *gin.Context) {
	gameId := generateGameId(6)
}
