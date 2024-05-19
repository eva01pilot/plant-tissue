import { toast } from "vue-sonner"

export default defineNuxtPlugin((nuxtApp)=>{
  const ToastComponent = defineComponent({
  props: {
    message: String,
    type: String,
  },
  setup(props) {
    console.log(props.message)
    return ()=>(<div>{props.message}</div>)
  }
})

  const notify = (message: string) =>{
    const div = <ToastComponent message={message}/>
    toast.custom(div)
  }
  return {
    provide: {
      notify
    }
  }
})
