import { userStore } from "~/store/user"


export default defineNuxtRouteMiddleware(async(to,from)=>{
  const store = userStore()
  if(store.user?.role!=='ADMIN') {
    return abortNavigation()
  }
})
