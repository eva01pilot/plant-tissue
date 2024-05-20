package models

type Platform_users struct {
	Id            int     `json:"id" form:"id"`
	Username      string  `json:"username" form:"username"`
	Password_hash *string `json:"password_hash,omitempty" form:"password_hash,omitempty"`
	Avatar        string  `json:"avatar" form:"avatar"`
}
