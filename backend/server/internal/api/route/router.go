package route

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	controller "server/internal/api/controller/auth"
	v1 "server/internal/api/route/api/v1/auth"
	repository "server/internal/domain/repository/auth"
	usecase "server/internal/domain/usecase/auth"
)

func AppHandler(db *pgx.Conn) *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	authRepo := repository.NewAuthRepository(db)
	authUsecase := usecase.NewAuthUsecase(authRepo)
	authController := controller.NewAuthControllers(authUsecase)
	v1.NewAuthRouters(r, authController)

	return r
}
