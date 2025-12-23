package server

import (
	"fmt"
	"sync"

	"github.com/gorilla/websocket"
)

type Player struct {
	ID   string          `json:"id"`
	Name string          `json:"name"`
	Conn *websocket.Conn `json:"-"`
}

type GameRoom struct {
	ID      string             `json:"id"`
	Players map[string]*Player `json:"players"`
}

var rooms = make(map[string]*GameRoom)
var roomsMutex sync.Mutex

func CreateRoom(id string) *GameRoom {
	roomsMutex.Lock()
	defer roomsMutex.Unlock()

	room, exists := rooms[id]
	if !exists {
		room = &GameRoom{
			ID:      id,
			Players: make(map[string]*Player),
		}
		rooms[id] = room
	}
	return room
}

func JoinRoom(id string) (*GameRoom, bool) {
	roomsMutex.Lock()
	defer roomsMutex.Unlock()
	room, exists := rooms[id]
	noOfPlayers := len(room.Players)
	fmt.Printf("%d", noOfPlayers)
	if !exists || noOfPlayers == 0 {

		return nil, false
	}
	return room, exists
}
