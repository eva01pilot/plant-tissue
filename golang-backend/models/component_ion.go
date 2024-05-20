package models

type Component_ion struct {
	Ion_id   int     `json:"ion_id" form:"ion_id"`
	Fraction float32 `json:"fraction" form:"fraction"`
}

type Component_ion_full struct {
	Ion_id     int     `json:"ion_id" form:"ion_id"`
	Formula    string  `json:"formula" form:"formula"`
	Molar_mass float32 `json:"molar_mass" form:"molar_mass"`
	Fraction   float32 `json:"fraction" form:"fraction"`
}

