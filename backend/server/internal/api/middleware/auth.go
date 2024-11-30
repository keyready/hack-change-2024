package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	helper "server/pkg/helper/jwt"
	"strings"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Отсутсвует заголовок авторизации"})
			return
		}

		authToken := strings.Split(authHeader, " ")[1]
		if authToken == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		var tokens helper.Token
		tokens.Access = authToken

		validErr := tokens.Validate("access")
		if validErr != nil {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{"error": fmt.Errorf("Ошибка валидации токена: %s", validErr.Error())})
			return
		}

		c.Next()
	}
}
