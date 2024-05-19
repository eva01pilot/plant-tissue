import axios from "axios"
import { Auth } from "~/api/auth"
import { Component } from "~/api/component"
import { Medium } from "~/api/medium"

export default defineNuxtPlugin((nuxtApp)=>{
  const instance = axios.create({baseURL: 'https://goback.ilyadev.com'})
  const auth = new Auth(instance)
  const component = new Component(instance)
  const medium = new Medium(instance)
  return {
    provide: {
      api: {
        auth,
        component,
        medium,
      }
    }
  }

})
