package models

type Medium_Component struct {
	Component_id int     `json:"component"`
	Mg_per_liter float32 `json:"mg_per_liter"`
}

type Medium_ComponentFull struct {
	Component_id int     `json:"component"`
	Type_id      int     `json:"type_id"`
	Formula      string  `json:"formula"`
	Name         string  `json:"name"`
	Mass         float32 `json:"mass"`
}
