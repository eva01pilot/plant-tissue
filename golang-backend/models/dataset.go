package models

type DatasetEntry struct {
	Id                      int     `json:"id,omitempty" form:"id,omitempty"`
	MediumId                int     `json:"medium_id,omitempty" form:"medium_id,omitempty"`
	PlantHeight             float32 `json:"plant_height,omitempty" form:"plant_height,omitempty"`
	ChlorophyllPercent      float32 `json:"chlorophyll_percent,omitempty"`
	TrueLeavesCount         int     `json:"true_leaves_count,omitempty"`
	NodeCount               int     `json:"node_count,omitempty"`
	SideShootsCount         int     `json:"side_shoots_count,omitempty"`
	ReproductionCoefficient float32 `json:"reproduction_coefficient,omitempty"`
}

type DatasetEntryFull struct {
	Ca                      float32
	Co                      float32
	Cu                      float32
	NO3                     float32
	I                       float32
	SO4                     float32
	Cl                      float32
	B                       float32
	Zn                      float32
	Mn                      float32
	Mo                      float32
	Fe                      float32
	K                       float32
	Mg                      float32
	Na                      float32
	PO4                     float32
	NH4                     float32
	Al                      float32
	Ni                      float32
	PlantHeight             float32 `json:"plant_height,omitempty" form:"plant_height,omitempty"`
	ChlorophyllPercent      float32 `json:"chlorophyll_percent,omitempty"`
	TrueLeavesCount         int     `json:"true_leaves_count,omitempty"`
	NodeCount               int     `json:"node_count,omitempty"`
	SideShootsCount         int     `json:"side_shoots_count,omitempty"`
	ReproductionCoefficient float32 `json:"reproduction_coefficient,omitempty"`
}

type DatasetEntryWithIons struct {
	Id                      int `json:"id,omitempty" form:"id,omitempty"`
	MediumIon               `json:"medium_ion,omitempty"`
	PlantHeight             float32 `json:"plant_height,omitempty" form:"plant_height,omitempty"`
	ChlorophyllPercent      float32 `json:"chlorophyll_percent,omitempty"`
	TrueLeavesCount         int     `json:"true_leaves_count,omitempty"`
	NodeCount               int     `json:"node_count,omitempty"`
	SideShootsCount         int     `json:"side_shoots_count,omitempty"`
	ReproductionCoefficient float32 `json:"reproduction_coefficient,omitempty"`
}
