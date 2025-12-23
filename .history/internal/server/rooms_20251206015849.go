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
	for i := 0; i < len(rooms); i++ {
		fmt.Printf("1. Room ID: %s\n", rooms[id])
	}

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

	for i := 0; i < len(rooms); i++ {
		fmt.Printf("2. Room ID: %s\n", rooms[id])
	}
	return room
}

func JoinRoom(id string) (*GameRoom, bool) {
	for i := 0; i < len(rooms); i++ {
		fmt.Printf("3. Room ID: %s\n", rooms[id])
	}
	roomsMutex.Lock()
	defer roomsMutex.Unlock()
	room, exists := rooms[id]
	noOfPlayers := len(room.Players)
	fmt.Printf("%d", noOfPlayers)
	if !exists || noOfPlayers == 0 {

		return nil, false
	}
	for i := 0; i < len(rooms); i++ {
		fmt.Printf("4. Room ID: %s\n", rooms[id])
	}
	return room, exists
}
