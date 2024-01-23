import { useNuxtApp } from "nuxt/app"

export interface ElementTable {
  name: string,
  formula: string,
  type: 'MICROELEMENT' | 'MACROELEMENT' | 'VITAMIN',
  typeName: 'Микроэлемент' | 'Макроэлемент' | 'Витамин'
  id?: number
}

export const elementTypes = {
  'MICROELEMENT': 'Микроэлемент',
  'MACROELEMENT': 'Макроэлемент',
  'VITAMIN': 'Витамин'
} as const

export const elementsStore = defineStore("elements",()=>{
  const elements = ref<ElementTable[]>([])
  const {$trpc} = useNuxtApp()
  const getElements = computed(()=>elements.value)
  async function getAllElements() {
    const res = await $trpc.element.getAllElements.query({page:1, limit: 100})
    elements.value = res.map((el)=>({...el, typeName: elementTypes[el.type]})) 
    console.log(elements.value)
  }

  async function addElement(element: ElementTable) {
    await $trpc.element.createElement.mutate(element)
    await getAllElements()
  }

  async function deleteElement(element: ElementTable) {
    if(!element.id) return
    await $trpc.element.deleteElement.mutate({id: element.id})
    await getAllElements()
  } 
  return {elements, getAllElements, addElement, getElements, deleteElement}
})

