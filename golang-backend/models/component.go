package models

type Component struct {
	Id      int    `json:"id"`
	Type_id int    `json:"type_id"`
	Formula string `json:"formula"`
	Ions    []Ion  `json:"ion"`
  Molar_mass float32 `json:"molar_mass"`
}

type ComponentInput struct {
	Id      int    `json:"id"`
	Type_id int    `json:"type_id"`
	Formula string `json:"formula"`
	Ions    []Component_ion_full  `json:"ions"`
  Molar_mass float32 `json:"molar_mass"`
}
