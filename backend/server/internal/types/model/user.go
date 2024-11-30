package model

import "time"

type UserModel struct {
	ID int64 `json:"id"`

	Mail     string `json:"mail"`
	Password string `json:"password"`
	Phone    string `json:"phone"`

	Firstname  string `json:"firstname"`
	Middlename string `json:"middlename"`
	Lastname   string `json:"lastname"`

	Description string `json:"description"`

	Division   string `json:"division"`
	Department string `json:"department"`
	Position   string `json:"position"`

	Avatar string `json:"avatar"`

	Roles []string `json:"roles"`

	TeamId int64 `json:"teamId"`

	LastOnline time.Time `json:"lastOnline"`
}
