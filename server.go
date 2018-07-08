package main

import (
	"log"
	"net/http"

	"github.com/squgeim/milksheet/api"
	. "github.com/squgeim/milksheet/api/config"
)

func main() {
	http.Handle("/api/", api.Handler())
	http.Handle("/", http.FileServer(http.Dir("app/build")))

	log.Println("Listening...")
	http.ListenAndServe(":"+Config.ServerPort, nil)
}
