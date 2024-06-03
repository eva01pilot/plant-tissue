package dataimport

import (
	"database/sql"
	"encoding/csv"
	"io"
	"plant-tissue-backend/helpers"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
)


func ImportDataset(file io.Reader, db *sql.DB) error {
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return err
	}

  var rows []models.DatasetEntry
	for id, record := range records {
		if(id==0) {
			continue
		}
		var row models.DatasetEntry
		row.MediumId,err = helpers.StrToInt(record[0])

		if err != nil {
			return err
		}
		row.PlantHeight,err = helpers.StrToFloat32(record[1])
		row.ChlorophyllPercent, err = helpers.StrToFloat32(record[2])
		if err != nil {
			return err
		}
		row.TrueLeavesCount, err = helpers.StrToInt(record[3])
		if err != nil {
			return err
		}
		row.NodeCount, err = helpers.StrToInt(record[4])
		if err != nil {
			return err
		}
		row.SideShootsCount, err = helpers.StrToInt(record[5])
		if err != nil {
			return err
		}
		row.ReproductionCoefficient, err = helpers.StrToFloat32(record[6])
		if err != nil {
			return err
		}
    rows = append(rows, row)
	}
    repo:=repositories.NewDatasetRepo(db)
    _,err=repo.CreateManyDatasetEntries(rows)
		if err != nil {
			return err
		}

		return nil
}
