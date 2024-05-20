package helpers

import (
	"errors"
	"fmt"
	"os"

	"github.com/dgrijalva/jwt-go"
)

func CreateToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"uid": userID,
	})

	secret := os.Getenv("JWT_SECRET")

  secretByte:=[]byte(secret)
	tokenString, err := token.SignedString(secretByte)
	return tokenString, err
}

func ParseToken(token string) (int, error) {
	parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["alg"])
		}
		return os.Getenv("JWT_SECRET"), nil
	})

	if claims, ok := parsed.Claims.(jwt.MapClaims); ok && parsed.Valid {
		uid := claims["uid"].(int)
		return uid, err
	}
  return 0, errors.New("could not parse jwt")
}
