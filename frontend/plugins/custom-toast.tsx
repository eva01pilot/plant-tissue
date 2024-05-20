import { toast } from "vue-sonner"

export default defineNuxtPlugin((nuxtApp)=>{

  const notify = (message: string) =>{
    toast(message)
  }
  return {
    provide: {
      notify
    }
  }
})
