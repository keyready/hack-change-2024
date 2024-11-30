package model

type NodeModel struct {
	ID          int64  `json:"id"`
	Type        string `json:"type"`
	Name        string `json:"name"`
	Description string `json:"description"`

	BossId int64 `json:"bossId"`

	Parent   int64   `json:"parents"`
	Children []int64 `json:"children"`
}
