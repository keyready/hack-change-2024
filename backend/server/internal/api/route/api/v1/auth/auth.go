package v1

import (
	"github.com/gin-gonic/gin"
	controller "server/internal/api/controller/auth"
)

func NewAuthRouters(r *gin.Engine, c *controller.AuthController) {
	authRouters := r.Group("/api/auth")

	authRouters.POST("/sign-up", c.SignUp)
	authRouters.POST("/sign-in", c.SignIn)
}
