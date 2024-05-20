package controllers

import (
	"database/sql"
)




type BaseController struct {
  db *sql.DB
  User UserController
  Medium MediumController
  Component ComponentController
  Component_type ComponentTypeController
}

func NewController(db *sql.DB) *BaseController {
  userController:=UserController {DB: db}
  mediumController:=MediumController {DB:db}
  ComponentController:=ComponentController{DB: db}
  ComponentTypeController:=ComponentTypeController{DB:db}

  return &BaseController {db: db,User: userController, Medium: mediumController, Component: ComponentController,Component_type: ComponentTypeController}
}

