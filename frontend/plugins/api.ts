import axios from "axios"
import { Auth } from "~/api/auth"
import { Calculator } from "~/api/calculator"
import { Component } from "~/api/component"
import { Dataset } from "~/api/dataset"
import { Medium } from "~/api/medium"

export default defineNuxtPlugin((nuxtApp)=>{
  const instance = axios.create({baseURL: 'https://goback.ilyadev.com'})
  const auth = new Auth(instance)
  const component = new Component(instance)
  const medium = new Medium(instance)
  const calculator = new Calculator(instance)
  const dataset = new Dataset(instance)
  return {
    provide: {
      api: {
        auth,
        component,
        medium,
        calculator,
        dataset,
      }
    }
  }

})
