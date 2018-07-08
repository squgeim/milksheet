package api

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/squgeim/milksheet/api/controllers"
	"github.com/squgeim/milksheet/api/utils"
)

func healthHandler(w http.ResponseWriter, r *http.Request) {
	utils.RespondWithJSON(w, 200, map[string]string{
		"status": "OK",
	})
}

// Handler returns a httpHandler for all the RESTfull API
func Handler() *mux.Router {
	authController := controllers.AuthController{}

	r := mux.NewRouter()
	s := r.PathPrefix("/api").Subrouter()

	s.HandleFunc("/health", healthHandler)

	// Auth endpoints
	s.HandleFunc("/auth/login", authController.LoginHandler).Methods("POST")

	return r
}
