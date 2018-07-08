package service

import (
	"log"

	"golang.org/x/crypto/bcrypt"

	"github.com/squgeim/milksheet/api/dao"
	"github.com/squgeim/milksheet/api/model"
)

// AuthService is a struct that contains the methods for authentication service
type AuthService struct{}

var userDAO dao.UserDAO

// LoginUser takes email and password and returns the user or error
func (a *AuthService) LoginUser(email string, password string) (model.User, error) {
	user, err := userDAO.FindByEmail(email)
	if err != nil {
		return model.User{}, err
	}

	log.Println(user, err)

	hashErr := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	return user, hashErr
}
