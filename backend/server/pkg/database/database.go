package database

import (
	"context"
	"github.com/jackc/pgx/v5"
	"log"
	"os"
	"sync"
)

var (
	instance *Database
	once     sync.Once
)

type Database struct {
	Conn *pgx.Conn
}

func GetDatabaseInstance() *Database {
	once.Do(func() {
		conn, err := pgx.Connect(context.Background(), os.Getenv("PG_URL"))
		if err != nil {
			log.Fatalf("Ошибка подключение к БД: %s", err.Error())
			return
		}

		instance = &Database{Conn: conn}
	})
	return instance
}

func (db *Database) Close() {
	err := db.Conn.Close(context.Background())
	if err != nil {
		log.Fatalf("Ошибка разрыва соединения с БД: %s", err.Error())
	}
}
