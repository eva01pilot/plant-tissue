package models

type Medium struct {
  Id          int                `json:"id" form:"id"`
  Name        string             `json:"name" form:"name"`
  Description string             `json:"description" form:"description"`
  Thumbnail   string             `json:"thumbnail" form:"thumbnail"`
  Components  []Medium_Component `json:"components" form:"components"`
}

type MediumWithComponents struct {
	Id          int                `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Thumbnail   string             `json:"thumbnail"`
	Components  []Medium_ComponentFull `json:"components"`
}
