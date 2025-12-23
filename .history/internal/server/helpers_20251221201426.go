package server

import (
	"math/rand"
	"strings"
	"time"
)

func roomIdGenerator(n int) string {
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

var funnyTitles = []string{
	"Boss", "Wizard", "Pirate", "Ninja", "Legend",
	"Bandit", "Gangster", "Jedi", "Titan",
	"Ghost", "Pro", "XD", "LOL", "OP",
}
var assamThings = []string{
	"Pitha", "Gamosa", "Bihu", "Muri", "Lota",
	"Rhino", "Kaziranga", "Brahmaputra", "Xaak",
	"Jol", "Mach", "Gamcha", "Beel", "Hati",
	"Chakuli", "Laru",
}

func playerIdGenerator() string {
	// rand.Seed(time.Now().UnixNano())
	a := assamThings[rand.Intn(len(assamThings))]
	b := funnyTitles[rand.Intn(len(funnyTitles))]
	return a + b
}
