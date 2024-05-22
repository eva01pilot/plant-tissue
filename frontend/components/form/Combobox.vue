<template>
 <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{model ? (model[props.valueKey].length ? model[props.valueKey] :
        'Выберите...' ) : 'Выберите...'}}
        <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-full">
    <Command :filter-function="filterFunction as any">
        <CommandInput  placeholder="Поиск..." />
        <CommandEmpty>Ничего не найдено</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in items"
              :key="item.id"
              :value="item"
              @select="handleSelect(item)"
            >
              <Check
                :class="cn(
                  'mr-2 h-4 w-4',
                  commandValue === item[props.valueKey] ? 'opacity-100' : 'opacity-0',
                )"
              />
              {{ item[props.valueKey] }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'



const model = defineModel<T|undefined>({required: true})
const props = defineProps<{
  items: T[];
  valueKey: keyof T;
}>()

const commandValue = ref("")
const open = ref(false)

const handleSelect = (item: T) =>{
  open.value = false
  model.value = item

}

function filterFunction(list: typeof props.items, searchTerm: string) {
  return list.filter((person) => {
    return person[props.valueKey].toLowerCase().includes(searchTerm.toLowerCase())
  })
}
</script>
