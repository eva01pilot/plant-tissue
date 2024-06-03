package repositories

import (
	"database/sql"
	"fmt"
	"plant-tissue-backend/models"
)

type DatasetRepo struct {
	DB *sql.DB
}

func NewDatasetRepo(db *sql.DB) *DatasetRepo {
	return &DatasetRepo{
		DB: db,
	}
}


func (r *DatasetRepo) CreateDatasetEntry(entry models.DatasetEntry) (*models.DatasetEntry, error) {
	var data models.DatasetEntry
	row := r.DB.QueryRow(`insert into dataset (medium_id, plant_height, chlorophyll_percent,
											true_leaves_count, node_count, side_shoots_count,
												reproduction_coefficient)
											values ($1, $2, $3, $4, $5, $6, $7)
											returning *;`,
		entry.MediumId,
		entry.PlantHeight,
		entry.ChlorophyllPercent,
		entry.TrueLeavesCount,
		entry.NodeCount,
		entry.SideShootsCount,
		entry.ReproductionCoefficient)

	row.Scan(&data.Id, &data.MediumId, &data.PlantHeight, &data.ChlorophyllPercent,
		&data.TrueLeavesCount, &data.NodeCount, &data.SideShootsCount,
		&data.ReproductionCoefficient)
	return &data, nil
}

func (r *DatasetRepo) CreateManyDatasetEntries(entries []models.DatasetEntry) (*[]models.DatasetEntry, error) {
	var data []models.DatasetEntry

	insert_statement := `insert into dataset (medium_id, plant_height, chlorophyll_percent,
											true_leaves_count, node_count, side_shoots_count,
												reproduction_coefficient) values`
	for idx, entry := range entries {
		if idx != 0 {
			insert_statement += ","
		}
		insert_statement += fmt.Sprintf("(%v, %v, %v, %v, %v,%v, %v)", entry.MediumId,
			entry.PlantHeight,
			entry.ChlorophyllPercent,
			entry.TrueLeavesCount,
			entry.NodeCount,
			entry.SideShootsCount,
			entry.ReproductionCoefficient)
	}

	rows, err := r.DB.Query(insert_statement)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		entry := models.DatasetEntry{}
		err := rows.Scan(&entry)
		if err != nil {
			return nil, err
		}
		data = append(data, entry)
	}
	return &data, nil
}

func (r *DatasetRepo) GetAllEntries() ([]models.DatasetEntryWithIons, error) {
	var data []models.DatasetEntryWithIons

	rows, err := r.DB.Query(`SELECT dataset.*, ion.formula, medium_ion.molarity from dataset
													JOIN medium_ion ON dataset.medium_id = medium_ion.medium_id
													JOIN ion ON medium_ion.ion_id = ion.id`)
	if err != nil {
		return data, nil
	}
	for rows.Next() {
		var entry models.DatasetEntryWithIons
		err = rows.Scan(&entry.Id, &entry.MediumId, &entry.PlantHeight, &entry.ChlorophyllPercent,
			&entry.TrueLeavesCount, &entry.NodeCount, &entry.SideShootsCount, &entry.ReproductionCoefficient, &entry.Formula, &entry.Molarity)
		if err != nil {
			return data, nil
		}
		data = append(data, entry)
	}

	return data, nil
}
