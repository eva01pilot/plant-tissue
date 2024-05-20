package models

type Ion struct {
  Id int `json:"id" form:"id"`
  Formula string `json:"formula" form:"formula"`
  Molar_mass float32 `json:"molar_mass" form:"molar_mass"`
}


