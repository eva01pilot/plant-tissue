package helpers

import "strconv"


func StrToFloat32(s string) (float32, error) {
  f64, err:=strconv.ParseFloat(s, 32)
  return float32(f64), err
}

func StrToInt(s string) (int, error) {
  i64, err:=strconv.ParseInt(s,10,32)
  return int(i64), err
}
