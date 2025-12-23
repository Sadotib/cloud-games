package server

import "github.com/gorilla/websocket"

type Player struct {
	ID   string          `json:"id"`
	Name string          `json:"name"`
	Conn *websocket.Conn `json:"-"`
}
