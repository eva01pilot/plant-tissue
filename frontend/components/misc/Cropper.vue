<template>
  <Cropper ref="cropper" :src="fileString" class="w-64 h-64" v-if="fileString"/>
  <UIButton @click="crop" v-if="fileString" variant="secondary" type="button">
    Обрезать
  </UIButton>
  <UIInput type="file" @change="handleFileChange" accept=".png,.jpeg,.jpg"/>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import type { ResizeEvent, CropperResult } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { convertDataUrlToBlob, toBase64 } from '~/lib/helpers/dataurl-to-file';
import type { CommonEvent } from '~/lib/types/common';

const cropper = ref<InstanceType<typeof Cropper>>()

const model = defineModel<File>({required: true})
const fileString = ref("")
const handleFileChange = (e:CommonEvent<HTMLInputElement>) => {
  const files = e.target.files
  if(files?.length) {
    model.value = files[0]
  }
}

watch(model, async()=>{
  fileString.value = await toBase64(model.value)
})


const crop=() =>{
  const e = cropper.value?.getResult()
  const dataUrl = e?.canvas?.toDataURL()
  if(!dataUrl) return
  const blob = convertDataUrlToBlob(dataUrl)
  if(!blob) return
  model.value = new File([blob], model.value.name)
}



</script>
