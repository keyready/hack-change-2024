package helper

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

type Claims struct {
	Mail string `json:"mail"`
	jwt.RegisteredClaims
}

type TokenI interface {
	Generate()
	Validate() error
	Refresh()
}

type Token struct {
	Access   string `json:"accessToken"`
	RefreshT string `json:"refreshToken"`
}

func (t *Token) Generate() {
	mail := ""
	claims := &Claims{
		Mail: mail,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(3 * time.Hour)),
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	accessTokenString, _ := accessToken.SignedString([]byte("JWT_ACCESS_SECRET"))

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	refreshTokenString, _ := refreshToken.SignedString([]byte("JWT_REFRESH_SECRET"))

	t.Access = accessTokenString
	t.RefreshT = refreshTokenString
}

func (t *Token) Validate(typeToken string) error {
	switch typeToken {
	case "access":
		_, parseErr := jwt.ParseWithClaims(t.Access, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			if !token.Valid {
				return nil, fmt.Errorf("Невалидный аксесс-токен")
			}
			return []byte("JWT_ACCESS_SECRET"), nil
		})
		if parseErr != nil {
			return fmt.Errorf("Ошибка парсинга JWT-токена")
		}
	case "refresh":
		_, parseErr := jwt.ParseWithClaims(t.RefreshT, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			if !token.Valid {
				return nil, fmt.Errorf("Невалидный рефреш-токен")
			}
			return []byte("JWT_REFRESH_SECRET"), nil
		})
		if parseErr != nil {
			return fmt.Errorf("Ошибка парсинга JWT-токена")
		}
	}
	return nil
}

func (t *Token) Refresh() {

}
