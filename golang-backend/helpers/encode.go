package helpers

import (
	"bytes"
	"encoding/csv"
	"strconv"
)

func EncodeCSV(columns []string, rows []map[string]float32) ([]byte, error) {
    var buf bytes.Buffer
    w := csv.NewWriter(&buf)
    if err := w.Write(columns); err != nil {
       return nil, err
    }
    r := make([]string, len(columns))
    for _, row :=  range rows {
       for i, column := range columns {
         r[i] = strconv.FormatFloat(float64(row[column]),'f',10,32)
       }
       if err := w.Write(r); err != nil {
          return nil, err
       }
    }
		w.Flush()
    return buf.Bytes(), nil
 }


