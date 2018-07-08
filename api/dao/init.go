package dao

import (
	"log"

	"gopkg.in/mgo.v2"
)

// DB is the mongodb instance used to connect to the database
var DB *mgo.Database

func connectDB(server string, database string) {
	session, err := mgo.Dial(server)
	if err != nil {
		log.Fatalln(err)
	}
	DB = session.DB(database)
}

func init() {
	connectDB("localhost", "milksheet")
}
