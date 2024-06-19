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


func ImportDatasetWithIons(file io.Reader, db *sql.DB) error {
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return err
	}

  var rows []models.DatasetEntryFull
	for id, record := range records {
		if(id==0) {
			continue
		}
		var row models.DatasetEntryFull
		row.Ca, err = helpers.StrToFloat32(record[0])
		if err != nil {
			return err
		}
		row.Co, err = helpers.StrToFloat32(record[1])
		if err != nil {
			return err
		}
		row.Cu, err = helpers.StrToFloat32(record[2])
		if err != nil {
			return err
		}
		row.NO3, err = helpers.StrToFloat32(record[3])
		if err != nil {
			return err
		}
		row.I, err = helpers.StrToFloat32(record[4])
		if err != nil {
			return err
		}
		row.SO4, err = helpers.StrToFloat32(record[5])
		if err != nil {
			return err
		}
		row.Cl, err = helpers.StrToFloat32(record[6])
		if err != nil {
			return err
		}
		row.B, err = helpers.StrToFloat32(record[7])
		if err != nil {
			return err
		}
		row.Zn, err = helpers.StrToFloat32(record[8])
		if err != nil {
			return err
		}
		row.Mn, err = helpers.StrToFloat32(record[9])
		if err != nil {
			return err
		}
		row.Mo, err = helpers.StrToFloat32(record[10])
		if err != nil {
			return err
		}
		row.Fe, err = helpers.StrToFloat32(record[11])
		if err != nil {
			return err
		}
		row.K, err = helpers.StrToFloat32(record[12])
		if err != nil {
			return err
		}
		row.Mg, err = helpers.StrToFloat32(record[13])
		if err != nil {
			return err
		}
		row.Na, err = helpers.StrToFloat32(record[14])
		if err != nil {
			return err
		}
		row.PO4, err = helpers.StrToFloat32(record[15])
		if err != nil {
			return err
		}
		row.NH4, err = helpers.StrToFloat32(record[16])
		if err != nil {
			return err
		}
		row.Al, err = helpers.StrToFloat32(record[17])
		if err != nil {
			return err
		}
		row.Ni, err = helpers.StrToFloat32(record[18])
		if err != nil {
			return err
		}
    rows = append(rows, row)
	}
    //repo:=repositories.NewDatasetRepo(db)
    //_,err=repo.CreateManyDatasetEntries(rows)
		if err != nil {
			return err
		}

		return nil
}
