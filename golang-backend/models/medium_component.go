package models

type Medium_Component struct {
  Component_id int     `json:"component_id" form:"component_id"`
  Mg_per_liter float32 `json:"mg_per_liter" form:"mg_per_liter"`
}

type Medium_ComponentFull struct {
  Component Medium_ComponentRow `json:"component"`
  Mg_per_liter float32 `json:"mg_per_liter" form:"mg_per_liter"`
}

type Medium_ComponentRow struct {
  Id int `json:"id" form:"id"`
  Component_formula string `json:"component_formula" form:"component_formula"`
  Component_molar_mass string `json:"component_molar_mass" form:"component_molar_mass"`
  Type_id int `json:"type_id" form:"type_id"`

}
