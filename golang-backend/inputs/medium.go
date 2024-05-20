package inputs

import (
	"errors"
	"mime/multipart"
	"net/http"

	"github.com/go-playground/form"
)

type CreateMediumComponentRelationInput struct {
	Component_id int `json:"component_id" form:"component_id"`
	Mg_per_liter int `json:"mg_per_liter" form:"mg_per_liter"`
}

type CreateMediumInput struct {
	Name        string                               `json:"name" form:"name"`
	Description string                               `json:"description" form:"description"`
	Thumbnail   *multipart.FileHeader                `json:"thumbnail" form:"thumbnail"`
	Components  []CreateMediumComponentRelationInput `json:"components" form:"components"`
}

func ParseMedium(r *http.Request, dst *CreateMediumInput) error {
	decoder := form.NewDecoder()

	err := decoder.Decode(&dst, r.MultipartForm.Value)
	if err != nil {
		return err
	}
	flat_form_files := make(map[string]*multipart.FileHeader)
	for k, v := range r.MultipartForm.File {
		println("key")
		flat_form_files[k] = v[0]
	}
	thumbnail := flat_form_files["thumbnail"]
	if thumbnail.Size > 3000000 {
		return errors.New("Изображение не должно весить больше 3 МБ")
	}
	if len(dst.Name) < 1 {
		return errors.New("Поле 'Название' обязательно для заполнения")
	}
	if len(dst.Name) > 100 {
		return errors.New("Поле 'Название' должно содержать не более 100 знаков")
	}
	if len(dst.Description) < 1 {
		return errors.New("Поле 'Описание' обязательно для заполнения")
	}
	dst.Thumbnail = thumbnail
	return nil
}
