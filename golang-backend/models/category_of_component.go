package models

type Component_type struct {
	Id          int    `json:"id" form:"id"`
	Name        string `json:"name" form:"name"`
	Has_formula bool   `json:"has_formula" form:"has_formula"`
  Name_rus string `json:"name_rus" form:"name_rus"`
}
