package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/squgeim/milksheet/api/util"
)

type AuthController struct{}

type user struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (l *AuthController) LoginHandler(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		util.RespondWithError(w, 400, "Invalid request")
		return
	}

	fmt.Println(req)

	if req.Email == "shreyadahal@gmail.com" && req.Password == "password" {
		util.RespondWithJSON(w, 200, user{
			ID:    2312341,
			Name:  "Shreya Dahal",
			Email: "shreyadahal@gmail.com",
		})
		return
	}

	util.RespondWithError(w, 401, "Incorrect email and password")
}
