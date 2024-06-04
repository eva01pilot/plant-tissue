package main

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
	"plant-tissue-backend/controllers"
	"plant-tissue-backend/data-import"
	"plant-tissue-backend/helpers"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	initEnv()

	db, err := initDB()
	if err != nil {
		log.Panic("Can't connect to DB")
	}
	if len(os.Args) > 1 {
		path := os.Args[1]
		if path == "seed" {
			seedTypes(db)
			seedIons(db)
      seedComponents(db)
			return
		}
		if path == "seeddataset" {
			file, err:= os.Open("./dataset.csv")
			if err!=nil {
				log.Panic("Cant read dataset file")
			}
			dataimport.ImportDataset(file, db)
		}

	}

	r := chi.NewRouter()

	baseController := controllers.NewController(db)

	defer db.Close()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://plants.ilyadev.com*"},
		AllowCredentials: true,
	}))

	r.Use(middleware.Logger)
	r.Post("/auth/login", controllers.MakeHandlerFunc(baseController.User.Login))
	r.Post("/auth/logout", controllers.MakeHandlerFunc(baseController.User.Logout))
	r.Post("/auth/signup", controllers.MakeHandlerFunc(baseController.User.CreateUser))
	r.Get("/mediums", controllers.MakeHandlerFunc(baseController.Medium.GetMediums))
	r.Post("/mediums", controllers.MakeHandlerFunc(baseController.Medium.CreateMedium))
	r.Post("/components", controllers.MakeHandlerFunc(baseController.Component.CreateComponent))
	r.Get("/components", controllers.MakeHandlerFunc(baseController.Component.GetComponents))
	r.Post("/components/search", controllers.MakeHandlerFunc(baseController.Component.SearchComponents))
	r.Get("/component_types", controllers.MakeHandlerFunc(baseController.Component_type.GetComponentTypes))
  r.Post("/calculate", controllers.MakeHandlerFunc(baseController.Calculator.Calculate))
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("<div>hello_world!!</div>"))
	})
	r.Post("/dataset", controllers.MakeHandlerFunc(baseController.Dataset.CreateDatasetEntry))
	r.Post("/dataset/import", controllers.MakeHandlerFunc(baseController.Dataset.ImportDataset))
	r.Get("/dataset", controllers.MakeHandlerFunc(baseController.Dataset.GetFullDataset))
	r.Get("/analyze", controllers.MakeHandlerFunc(baseController.Dataset.Analyze) )
	r.Post("/mediums/calculate-ions-relations", controllers.MakeHandlerFunc(baseController.Medium.CalculateMediumIons))

	http.ListenAndServe(":1000", r)
}

func seedTypes(db *sql.DB) {
	db.Exec(`insert into category_of_component (name, name_rus, has_formula) values($1,$2,$3)`,
		"macroelement", "макроэлемент", true)
	db.Exec(`insert into category_of_component (name, name_rus,has_formula) values($1,$2,$3)`,
		"microelement", "микроэлемент", true)
	db.Exec(`insert into category_of_component (name, name_rus,has_formula) values($1,$2,$3)`,
		"vitamin", "витамин", false)
}

func seedComponents(db *sql.DB) {
	file, err := os.Open("./components.csv")
	if err != nil {
		panic(err.Error())
	}

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		panic(err.Error())
	}

  var rows []inputs.CreateComponentFromCsvRow
	for _, record := range records {
		var row inputs.CreateComponentFromCsvRow
		row.Formula = record[0]
		row.Ion_formula = record[1]
		row.Molar_mass, err = helpers.StrToFloat32(record[2])
		if err != nil {
			panic(err.Error())
		}
		row.Ion_fraction, err = helpers.StrToFloat32(record[3])
		if err != nil {
			panic(err.Error())
		}
		row.Ion_quantity, err = helpers.StrToInt(record[4])
		if err != nil {
			panic(err.Error())
		}
		row.Type_id, err = helpers.StrToInt(record[5])
		if err != nil {
			panic(err.Error())
		}
    rows = append(rows, row)
	}
    repo:=repositories.NewComponentRepo(db)
    _,err=repo.CreateManyComponents(rows)
		if err != nil {
			panic(err.Error())
		}


}

func seedIons(db *sql.DB) {
	file, err := os.Open("./ions.csv")

	if err != nil {
		panic(err.Error())
	}

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		panic(err.Error())
	}

	var ions []models.Ion

	for _, record := range records {
		ion := record[0]
		value, err := strconv.ParseFloat(record[1], 32)
		if err != nil {
			panic(err.Error())
		}
		molar_mass := float32(value)
		ions = append(ions, models.Ion{Formula: ion, Molar_mass: molar_mass})
	}

	insert_statement := "insert into ion(formula, molar_mass) values"
	for idx, ion := range ions {
		if idx == 0 {
			insert_statement += fmt.Sprintf("('%v',%v)", ion.Formula, ion.Molar_mass)
		} else {
			insert_statement += fmt.Sprintf(",('%v',%v)", ion.Formula, ion.Molar_mass)
		}
	}
	insert_statement += "ON CONFLICT(formula) DO UPDATE SET (formula, molar_mass) = (EXCLUDED.formula, EXCLUDED.molar_mass);"
  _, err=db.Exec(insert_statement)
	if err != nil {
		panic(err.Error())
	}
}

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
