<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-dialog v-model="dialog" width="auto" persistent>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">Open Dialog</v-btn>
          </template>
          <v-card>
            <my-editor></my-editor>
            <v-card-actions>
              <v-btn variant="flat" color="primary" block @click="dialog = false">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            variant="outlined"
            clearable
            v-model="name.value.value"
            :counter="10"
            :error-messages="name.errorMessage.value"
            label="姓名"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            clearable
            v-model="phone.value.value"
            :counter="7"
            :error-messages="phone.errorMessage.value"
            label="电话"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            clearable
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>
          <v-select
            variant="outlined"
            v-model="select.value.value"
            :items="items"
            :error-messages="select.errorMessage.value"
            label="Select"
          ></v-select>
          <v-select
            label="星期"
            :items="[
              { day: 'Monday', number: 8 },
              { day: 'Tuesday', number: 5 },
            ]"
            item-title="day"
            item-value="number"
            variant="outlined"
          ></v-select>
          <v-select
            :items="['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut']"
            label="国家"
            multiple
            variant="outlined"
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>
          <v-checkbox
            v-model="checkbox.value.value"
            :error-messages="checkbox.errorMessage.value"
            color="indigo"
            hide-details
            value="1"
            label="Option"
            type="checkbox"
          ></v-checkbox>
          <v-radio-group inline>
            <v-radio label="Radio 1" color="warning" value="1"></v-radio>
            <v-radio label="Radio 2" color="warning" value="2"></v-radio>
            <v-radio label="Radio 3" color="warning" value="3"></v-radio>
          </v-radio-group>

          <Dropzone v-model="images"></Dropzone>
          <v-textarea variant="underlined" clearable clear-icon="mdi-close-circle" label="Text"></v-textarea>
          <v-file-input
            label="File input"
            show-size
            accept="image/png, image/jpeg, image/bmp"
            variant="outlined"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <file-single-image-input></file-single-image-input>
          <v-row>
            <v-col col="12">
              <div>{{ newDate }}</div>
              <date-picker v-model="newDate"></date-picker>
            </v-col>
          </v-row>

          <my-editor></my-editor>
          <v-row>
            <v-col cols="12">
              <div class="title">产品展示图组</div>
              <FileMultiImageInput></FileMultiImageInput>
            </v-col>
          </v-row>
          <v-switch
            v-model="model"
            :true-value="1"
            false-value="0"
            :label="`Switch: ${model.toString()}`"
            color="info"
            hide-details
            inset
          ></v-switch>
          <v-btn variant="flat" color="primary" class="me-4" type="submit">submit</v-btn>
          <v-btn variant="flat" color="info" @click="handleReset">clear</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
import DatePicker from '@/components/shared/DatePicker'
import MyEditor from '@/components/myEditor'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import FileSingleImageInput from '@/components/shared/FileSingleImageInput'
import FileMultiImageInput from '@/components/shared/FileMultiImageInput'
import Dropzone from '@/components/shared/Dropzone'

let userSchema = object({
  name: string().required('姓名 必填'),
  phone: string().required('phone 必填'),
  email: string().required('email 必填'),
  select: string().required('select 必填'),
  checkbox: boolean().required('checkbox 必填').oneOf([true, false], 'Message'),
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: userSchema,
})

const newDate = ref(new Date())
const dialog = ref(false)
const images = ref([])

watch(images, (value) => {
  console.log(value)
})

onMounted(() => {})

onMounted(() => {
  getCurrentInstance().refs
})

const model = ref(true)

const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')
// name.setValue('1')

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const imagesDropzoneOptions = {
  url: 'https://httpbin.org/post',
  thumbnailWidth: 150,
  maxFilesize: 2,
  // acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
  parallelUploads: 3,
  maxFiles: 3,
  uploadMultiple: true,
  autoProcessQueue: false,
  addRemoveLinks: true,
}

async function afterUploadComplete(response) {
  if (response.status === 'success') {
    console.log('upload successful')
  } else {
    console.log('upload failed')
  }
}

const submit = handleSubmit((values) => {
  console.log(values)
  alert(JSON.stringify(values, null, 2))
})
</script>
<style lang="scss" scoped>
.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
