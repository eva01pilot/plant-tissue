import { serialize } from "object-to-formdata"
export function objectToFormData(object: any){
  return serialize(object, {
    indices:true,
    nullsAsUndefineds: false,
    booleansAsIntegers: true,
    allowEmptyArrays: false,
    noFilesWithArrayNotation: false,
    dotsForObjectNotation: true
  })
}

