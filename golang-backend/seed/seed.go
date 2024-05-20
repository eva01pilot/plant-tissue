package seed

import (
	"database/sql"
	"os"

	"github.com/joho/godotenv"
)


func initEnv() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

}

func initDB() (*sql.DB, error) {
	conn_string := os.Getenv("DB_CONN")
	db, err := sql.Open("postgres", conn_string)
	return db, err
}

func main() {
	initEnv()

	db, err := initDB()


	if err != nil {
	}

	defer db.Close()


}

