package models

type DatasetEntry struct {
	Id                      int     `json:"id,omitempty" form:"id,omitempty"`
	MediumId                int     `json:"medium_id,omitempty" form:"medium_id,omitempty"`
	PlantHeight             float32 `json:"plant_height,omitempty" form:"plant_height,omitempty"`
	ChlorophyllPercent      float32 `json:"chlorophyll_percent,omitempty"`
	TrueLeavesCount         int     `json:"true_leaves_count,omitempty"`
	NodeCount               int     `json:"node_count,omitempty"`
	SideShootCount          int     `json:"side_shoot_count,omitempty"`
	ReproductionCoefficient float32 `json:"reproduction_coefficient,omitempty"`
}
