package main

import (
	"log"
	"net/http"

	"github.com/squgeim/milksheet/api"
)

func main() {
	http.Handle("/api/", api.Handler())
	http.Handle("/", http.FileServer(http.Dir("app/build")))

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
