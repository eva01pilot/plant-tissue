package inputs

type CreateComponentIonRelationInput struct {
	Ion_id   int     `json:"ion_id" form:"ion_id"`
	Fraction float32 `json:"fraction" form:"fraction"`
}

type CreateComponentInput struct {
	Formula    string                            `json:"formula" from:"formula"`
	Type_id    int                               `json:"type_id" form:"type_id"`
	Molar_mass float32                           `json:"molar_mass" form:"molar_mass"`
	Ions       []CreateComponentIonRelationInput `json:"ions" form:"ions"`
}

type SearchComponentInput struct {
	Search string `json:"search" form:"search"`
}

type CreateComponentFromCsvRow struct {
	Formula      string  `json:"formula" from:"formula"`
	Type_id      int     `json:"type_id" form:"type_id"`
	Molar_mass   float32 `json:"molar_mass" form:"molar_mass"`
	Ion_formula  string  `json:"ion_formula" form:"ion_formula"`
	Ion_quantity int     `json:"ion_quantity" form:"ion_quantity"`
	Ion_fraction float32 `json:"ion_fraction" form:"ion_fraction"`
}
