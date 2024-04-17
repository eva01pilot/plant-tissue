import { useNuxtApp } from "nuxt/app"
import { defineStore } from "pinia"

export interface ElementTable {
  name: string,
  formula: string,
  type: 'MICROELEMENT' | 'MACROELEMENT' | 'VITAMIN',
  typeName?: 'Микроэлемент' | 'Макроэлемент' | 'Витамин'
  id?: number
}

export const elementTypes = {
  'MICROELEMENT': 'Микроэлемент',
  'MACROELEMENT': 'Макроэлемент',
  'VITAMIN': 'Витамин',
} as const

export const elementsStore = defineStore("elements", () => {
  const elements = ref<ElementTable[]>([])
  const { $trpc } = useNuxtApp()
  const searchTerm = ref('')
  const getElements = computed(() => !!searchTerm.value ? searchElements.value: elements.value)
  async function getAllElements() {
    const res = await $trpc.element.getAllElements.query({ page: 1, limit: 100 })
    const mapped = res.map((el) => ({ ...el, typeName: elementTypes[el.type] }))
    elements.value = mapped
  }


  const searchElements = computed(()=> {
    console.log(searchTerm.value)
    return elements.value.filter((el)=>el.name.includes(searchTerm.value) || el.formula.includes(searchTerm.value))
  })

  async function addElement(element: ElementTable) {
    await $trpc.element.createElement.mutate(element)
    await getAllElements()
  }

  async function deleteElement(element: ElementTable) {
    if (!element.id) return
    await $trpc.element.deleteElement.mutate({ id: element.id })
    await getAllElements()
  }
  return { elements, getAllElements, addElement, getElements, deleteElement, searchElements, searchTerm }
})
