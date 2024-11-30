package usecase

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"server/internal/domain/repository/auth"
	dto "server/internal/types/dto/auth"
	helper "server/pkg/helper/jwt"
)

type AuthUsecaseI interface {
	SignUp(signUpRequest dto.SignUpRequest) (httpCode int, err error)
	SignIn(signInRequest dto.SignInRequest) (httpCode int, err error, tokens helper.Token)
}

type AuthUsecase struct {
	authRepository *repository.AuthRepository
}

func NewAuthUsecase(authRepository *repository.AuthRepository) *AuthUsecase {
	return &AuthUsecase{authRepository: authRepository}
}

func (uc *AuthUsecase) SignUp(signUpRequest dto.SignUpRequest) (httpCode int, err error) {
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(signUpRequest.Password), bcrypt.DefaultCost)
	signUpRequest.Password = string(hashPassword)

	httpCode, err = uc.authRepository.SignUp(signUpRequest)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}

func (uc *AuthUsecase) SignIn(signInRequest dto.SignInRequest) (httpCode int, err error, tokens helper.Token) {
	httpCode, err, findUser := uc.authRepository.SignIn(signInRequest)
	if err != nil {
		return httpCode, err, tokens
	}

	validPasswd := bcrypt.CompareHashAndPassword([]byte(findUser.Password), []byte(signInRequest.Password))
	if validPasswd != nil {
		return http.StatusBadRequest, fmt.Errorf("Неверный логин или пароль"), tokens
	}

	tokens.Generate()

	return httpCode, nil, tokens
}
