package dto

type SignUpRequest struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
}

type SignInRequest struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
}
