package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/internal/api/route"
	"server/pkg/database"
)

func main() {
	db := database.GetDatabaseInstance()
	defer db.Close()

	appHandler := route.AppHandler(db.Conn)

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")),
		Handler: appHandler,
	}

	log.Fatal(server.ListenAndServe().Error())
}
