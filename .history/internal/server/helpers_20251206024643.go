package server

import (
	"encoding/json"
	"math/rand"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

func gameIdGenerator(n int) string {
	const letterBytes = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const (
		letterIdxBits = 6                    // 6 bits to represent a letter index
		letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
		letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
	)
	var src = rand.NewSource(time.Now().UnixNano())
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
