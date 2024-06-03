package models

type MediumIon struct {
	MediumId int     `json:"medium_id,omitempty"`
	Formula  string     `json:"formula,omitempty"`
	Molarity float32 `json:"molarity,omitempty"`
}
