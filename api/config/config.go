package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	DatabaseHost string
	DatabaseName string
	ServerPort   string
}

// Config contains all the configuration for this server extracted from .env
var Config config

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbName, ok := os.LookupEnv("DB_NAME")
	if ok != true {
		dbName = "milksheet"
	}

	dbHost, ok := os.LookupEnv("DB_HOST")
	if ok != true {
		dbHost = "localhost"
	}

	serverPort, ok := os.LookupEnv("PORT")
	if ok != true {
		serverPort = "3000"
	}

	Config = config{
		DatabaseHost: dbHost,
		DatabaseName: dbName,
		ServerPort:   serverPort,
	}
}
