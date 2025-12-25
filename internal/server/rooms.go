package server

import (
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

	HostID  string `json:"hostId"`
	Started bool   `json:"started"`

	Board        [9]string `json:"board"`  // "", "X", "O"
	Turn         string    `json:"turn"`   // playerId whose turn it is
	Winner       string    `json:"winner"` // "", "draw", or playerId
	RematchCount int
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
			Started: false,
			HostID:  "",
			Board:   [9]string{},
			Turn:    "",
			Winner:  "",
		}
		rooms[id] = room
	}

	return room
}

func JoinRoom(id string) (*GameRoom, bool) {

	roomsMutex.Lock()
	defer roomsMutex.Unlock()
	room, exists := rooms[id]

	// noOfPlayers := len(room.Players)
	// fmt.Printf("Number of players in room %s: %d\n", id, noOfPlayers)
	// fmt.Printf("%d", noOfPlayers)
	if !exists {

		return nil, false
	}

	return room, exists
}
