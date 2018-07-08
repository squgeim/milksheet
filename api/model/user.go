package model

import (
	"gopkg.in/mgo.v2/bson"
)

// User is the structure of the user in the database
type User struct {
	ID       bson.ObjectId `bson:"_id" json:"id"`
	Name     string        `bson:"name" json:"name"`
	Password string        `bson:"password" json:"-"`
	Email    string        `bson:"email" json:"email"`
}
