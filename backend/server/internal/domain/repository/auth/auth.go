package repository

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	"net/http"
	dto "server/internal/types/dto/auth"
	"server/internal/types/model"
)

type AuthRepositoryI interface {
	SignUp(signUpRequest dto.SignUpRequest) (httpCode int, err error)
	SignIn(signInRequest dto.SignInRequest) (httpCode int, err error, userExist model.UserModel)
}

type AuthRepository struct {
	DB *pgx.Conn
}

func NewAuthRepository(conn *pgx.Conn) *AuthRepository {
	return &AuthRepository{DB: conn}
}

func (repo *AuthRepository) SignUp(signUpRequest dto.SignUpRequest) (httpCode int, err error) {
	var userExists bool
	err = repo.DB.QueryRow(
		context.Background(),
		"SELECT EXISTS (SELECT 1 FROM users WHERE mail = $1)",
		signUpRequest.Mail,
	).Scan(&userExists)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка при регистрации %s", err.Error())
	}

	if userExists {
		return http.StatusBadRequest, fmt.Errorf("Пользователь уже зарегистрирован")
	}

	_, err = repo.DB.Exec(
		context.Background(),
		`INSERT INTO users (mail,phone,password,role) VALUES ($1,$2,$3)`,
		signUpRequest.Mail,
		signUpRequest.Phone,
		signUpRequest.Password,
	)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления пользователя в БД: %w", err)
	}

	return http.StatusOK, nil
}

func (repo *AuthRepository) SignIn(signInRequest dto.SignInRequest) (httpCode int, err error, userExist model.UserModel) {

	err = repo.DB.QueryRow(
		context.Background(),
		"SELECT EXISTS (SELECT 1 FROM users WHERE mail = $1)",
		signInRequest.Mail,
	).Scan(&userExist)

	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка БД: %s", err.Error()), userExist
	}

	if userExist.ID < 1 {
		return http.StatusBadRequest, fmt.Errorf("Неверный логин или пароль"), userExist
	}

	return http.StatusOK, nil, userExist
}
