package server

import "golang.org/x/net/websocket"

type Player struct {
	ID   string          `json:"id"`
	Name string          `json:"name"`
	Conn *websocket.Conn `json:"-"`
}
