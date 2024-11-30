package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	usecase "server/internal/domain/usecase/auth"
	dto "server/internal/types/dto/auth"
)

type AuthController struct {
	authUsecase *usecase.AuthUsecase
}

func NewAuthControllers(usecase *usecase.AuthUsecase) *AuthController {
	return &AuthController{authUsecase: usecase}
}

func (c *AuthController) SignUp(ctx *gin.Context) {
	var signUpRequest dto.SignUpRequest
	bindErr := ctx.ShouldBindJSON(&signUpRequest)
	if bindErr != nil {
		ctx.AbortWithStatusJSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("Ошибка получения данных от клиента: %s", bindErr.Error())},
		)
		return
	}

	httpCode, usecaseErr := c.authUsecase.SignUp(signUpRequest)
	if usecaseErr != nil {
		ctx.AbortWithStatusJSON(httpCode, gin.H{"error": usecaseErr.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{})
}

func (c *AuthController) SignIn(ctx *gin.Context) {
	var signInRequest dto.SignInRequest
	bindErr := ctx.ShouldBindJSON(&signInRequest)
	if bindErr != nil {
		ctx.AbortWithStatusJSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("Ошибка получения данных от клиента: %s", bindErr.Error())})
		return
	}

	httpCode, usecaseErr, tokens := c.authUsecase.SignIn(signInRequest)
	if usecaseErr != nil {
		ctx.AbortWithStatusJSON(httpCode, gin.H{"error": usecaseErr.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"tokens": tokens})
}
