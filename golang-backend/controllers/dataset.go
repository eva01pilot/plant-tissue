package controllers

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	dataimport "plant-tissue-backend/data-import"
	"plant-tissue-backend/helpers"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
)

type DatasetController struct {
	DB *sql.DB
}

func (c *DatasetController) Analyze (w http.ResponseWriter, r *http.Request) error {
	param:=r.URL.Query().Get("param")
	repo := repositories.NewDatasetRepo(c.DB)
	ion_repo := repositories.NewIonRepo(c.DB)

	ions, err := ion_repo.GetAllIons()
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	var entry_map_map = make(map[int]map[string]float32)
	var entry_map_list []map[string]float32

	entries, err := repo.GetAllEntries()

	for _, entry := range entries {
		if e, ok := entry_map_map[entry.Id]; ok {
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		} else {
			e = make(map[string]float32)
			for _, ion:=range ions {
				e[ion.Formula] = 0
			}
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		}
	}

	for _, entry := range entry_map_map {
		entry_map_list = append(entry_map_list, entry)
	}

	var keys []string
	for k := range entry_map_list[0] {
		keys = append(keys, k)
	}
	csv_file,err:=helpers.EncodeCSV(keys, entry_map_list)

  body := &bytes.Buffer{}
  writer := multipart.NewWriter(body)
	reader := bytes.NewReader(csv_file)
	part, _ := writer.CreateFormFile("dataset", "dataset.csv")
  io.Copy(part, reader)
  writer.Close()
	req, _ := http.NewRequest("POST", fmt.Sprintf(`http://80.87.106.181:4000/analysis/%v`, param), body)
  req.Header.Add("Content-Type", writer.FormDataContentType())
  client := &http.Client{}
	res, err:=client.Do(req)
	var target any
	json.NewDecoder(res.Body).Decode(&target)
	print(target)
	return WriteJSON(w,200, target)
}
func (c *DatasetController) ImportDataset (w http.ResponseWriter, r *http.Request) error {
	err:=r.ParseMultipartForm(1000000000)
	if(err!=nil) {
		return WriteJSON(w, 400, err.Error())
	}

	file, _, err:=r.FormFile("dataset")
	if(err!=nil) {
		return WriteJSON(w, 400, err.Error())
	}


	err=dataimport.ImportDataset(file, c.DB)
	if(err!=nil) {
		return WriteJSON(w, 400, err.Error())
	}

	return c.GetFullDataset(w,r)
}

func (c *DatasetController) CreateDatasetEntry(w http.ResponseWriter, r *http.Request) error {
	var body []models.DatasetEntry
	decodeJSONBody(w, r, &body)

	repo := repositories.NewDatasetRepo(c.DB)

	created_component, err := repo.CreateManyDatasetEntries(body)

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w, 200, created_component)
}

func (c *DatasetController) GetFullDatasetCSV(w http.ResponseWriter, r *http.Request) error {
	repo := repositories.NewDatasetRepo(c.DB)
	ion_repo := repositories.NewIonRepo(c.DB)

	ions, err := ion_repo.GetAllIons()
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	var entry_map_map = make(map[int]map[string]float32)
	var entry_map_list []map[string]float32

	entries, err := repo.GetAllEntries()

	for _, entry := range entries {
		if e, ok := entry_map_map[entry.Id]; ok {
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		} else {
			e = make(map[string]float32)
			for _, ion:=range ions {
				e[ion.Formula] = 0
			}
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		}
	}

	for _, entry := range entry_map_map {
		entry_map_list = append(entry_map_list, entry)
	}

	var keys []string
	for k := range entry_map_list[0] {
		keys = append(keys, k)
	}
	bytes,err:=helpers.EncodeCSV(keys, entry_map_list)

	w.Header().Add("Content-Disposition", `attachment; filename="test.csv"`)
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}
		_,err = w.Write(bytes)
	return err
}

func (c *DatasetController) GetFullDataset(w http.ResponseWriter, r *http.Request) error {
	repo := repositories.NewDatasetRepo(c.DB)
	ion_repo := repositories.NewIonRepo(c.DB)

	ions, err := ion_repo.GetAllIons()
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	var entry_map_map = make(map[int]map[string]float32)
	var entry_map_list []map[string]float32

	entries, err := repo.GetAllEntries()

	for _, entry := range entries {
		if e, ok := entry_map_map[entry.Id]; ok {
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		} else {
			e = make(map[string]float32)
			for _, ion:=range ions {
				e[ion.Formula] = 0
			}
			e[entry.Formula] = entry.Molarity
			e["plant_height"] = entry.PlantHeight
			e["chlorophyll_percent"] = entry.ChlorophyllPercent
			e["true_leaves_count"] = float32(entry.TrueLeavesCount)
			e["node_count"] = float32(entry.NodeCount)
			e["side_shoots_count"] = float32(entry.SideShootsCount)
			e["reproduction_coefficient"] = entry.ReproductionCoefficient
			entry_map_map[entry.Id] = e
		}
	}

	for _, entry := range entry_map_map {
		entry_map_list = append(entry_map_list, entry)
	}

	var keys []string
	for k := range entry_map_list[0] {
		keys = append(keys, k)
	}

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}
		return WriteJSON(w, 200, entry_map_list)
}
