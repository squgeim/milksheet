package controller

import (
	"encoding/json"
	"net/http"

	"github.com/squgeim/milksheet/api/service"
	"github.com/squgeim/milksheet/api/util"
)

// AuthController is the struct that contains the methods for authentication controller
type AuthController struct{}

var authService service.AuthService

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginHandler handles request to log user in
func (l *AuthController) LoginHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		util.RespondWithError(w, 400, "Invalid request")
		return
	}

	user, err := authService.LoginUser(req.Email, req.Password)
	if err != nil {
		util.RespondWithError(w, 401, "Incorrect email and password.")
		return
	}

	util.RespondWithJSON(w, 200, user)
}
