package dao

import (
	"gopkg.in/mgo.v2/bson"

	"github.com/squgeim/milksheet/api/model"
)

// UserDAO struct for user DAO
type UserDAO struct{}

const (
	// COLLECTION is the name of collection for users in the db
	COLLECTION = "users"
)

// FindAll returns all the users in the collection
func (u *UserDAO) FindAll() ([]model.User, error) {
	var users []model.User
	err := DB.C(COLLECTION).Find(bson.M{}).All(&users)
	return users, err
}

// FindByID finds one user by its id
func (u *UserDAO) FindByID(id string) (model.User, error) {
	var user model.User
	err := DB.C(COLLECTION).FindId(bson.ObjectIdHex(id)).One(&user)
	return user, err
}

// FindByEmail finds one user by its email
func (u *UserDAO) FindByEmail(email string) (model.User, error) {
	var user model.User
	err := DB.C(COLLECTION).Find(bson.M{"email": email}).One(&user)
	return user, err
}

// Insert takes a user model and inserts it into the db
func (u *UserDAO) Insert(user model.User) error {
	err := DB.C(COLLECTION).Insert(&user)
	return err
}

// Delete removes the given user model from the database
func (u *UserDAO) Delete(user model.User) error {
	err := DB.C(COLLECTION).Remove(&user)
	return err
}

// Update updates a model in the database
func (u *UserDAO) Update(user model.User) error {
	err := DB.C(COLLECTION).UpdateId(user.ID, &user)
	return err
}
