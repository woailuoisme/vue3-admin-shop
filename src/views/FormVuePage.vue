<template>
  <v-container fluid>
    <!--    <data-filter></data-filter> -->
    <o-t-p></o-t-p>
    <input-integer v-model="num"></input-integer>
    {{ num }}
    <v-card>
      <v-card-title>
        <v-dialog v-model="dialog" width="auto" persistent>
          <template #activator="{ props }">
            <v-btn color="primary" v-bind="props">Open Dialog</v-btn>
          </template>
          <v-card>
            <v-card-actions>
              <v-btn variant="flat" color="primary" block @click="dialog = false">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <delay-button />
      </v-card-title>
      <v-card-text>
        <v-form fast-fail @submit="submit">
          <v-text-field
            v-model="name.value.value"
            class="mb-3"
            variant="outlined"
            clearable
            :counter="10"
            single-line
            :error-messages="name.errorMessage.value"
            label="姓名"
          />
          <v-text-field
            v-model="phone.value.value"
            variant="outlined"
            clearable
            :counter="7"
            :error-messages="phone.errorMessage.value"
            label="电话"
          />
          <v-text-field
            v-model="email.value.value"
            variant="outlined"
            clearable
            :error-messages="email.errorMessage.value"
            label="E-mail"
          />
          <v-select
            v-model="select.value.value"
            variant="outlined"
            :items="items"
            :error-messages="select.errorMessage.value"
            label="Select"
          />
          <v-select
            label="星期"
            :items="[
              { day: 'Monday', number: 8 },
              { day: 'Tuesday', number: 5 },
            ]"
            item-title="day"
            item-value="number"
            variant="outlined"
          />
          <v-select
            :items="['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut']"
            label="国家"
            multiple
            variant="outlined"
            hint="Pick your favorite states"
            persistent-hint
          />
          <v-checkbox
            v-model="checkbox.value.value"
            :error-messages="checkbox.errorMessage.value"
            color="indigo"
            hide-details
            value="1"
            label="Option"
            type="checkbox"
          />
          <v-radio-group inline>
            <v-radio label="Radio 1" color="warning" value="1" />
            <v-radio label="Radio 2" color="warning" value="2" />
            <v-radio label="Radio 3" color="warning" value="3" />
          </v-radio-group>

          <dropzone v-model="images" />
          <v-textarea variant="underlined" clearable clear-icon="mdi-close-circle" label="Text" />
          <!--          <file-upload /> -->
          <v-file-input
            v-model="image.value.value"
            label="文件"
            :error-messages="image.errorMessage.value"
            show-size
            variant="outlined"
            validate-on="blur"
            prepend-inner-icon="mdi-camera"
            prepend-icon=""
          />
          <file-single-image-input v-model="singleImage" />
          <v-row>
            <v-col col="12">
              <div>{{ newDate }}</div>
              <date-picker v-model="newDate" />
            </v-col>
          </v-row>

          <my-editor />
          <v-switch
            v-model="model"
            :true-value="1"
            false-value="0"
            :label="`Switch: ${model.toString()}`"
            color="info"
            hide-details
            inset
          />
          <v-btn :disabled="!meta.valid" block variant="flat" color="primary" class="me-4" type="submit">submit</v-btn>
          <v-btn variant="flat" color="info" @click="handleReset">clear</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import DatePicker from "@/components/shared/DatePicker"
import DataFilter from "@/components/table/DataFilter"
import { getCurrentInstance, onMounted, ref, watch } from "vue"
import { useField, useForm } from "vee-validate"
import yup from "@/utils/validation"
import FileSingleImageInput from "@/components/shared/FileSingleImageInput"
import Dropzone from "@/components/shared/Dropzone"
import DelayButton from "@/components/shared/DelayButton"
import FileUpload from "@/components/shared/FileUpload"
import OTP from "@/components/OTP"
import InputInteger from "@/components/shared/InputInteger"
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
const num = ref(1)

let userSchema = yup.object({
  name: yup.string().required().label("姓名"),
  phone: yup.string().required(),
  email: yup.string().required(),
  select: yup.string().required(),
  checkbox: yup.boolean().required().oneOf([true, false]),
  image: yup.mixed().fileRequired().fileSize(2).imageType(),
})

const { handleSubmit, handleReset, meta } = useForm({
  validationSchema: userSchema,
  initialValues: {
    name: "hello",
    phone: "16620702222",
    email: "ailuo@126.com ",
    select: "Item 2",
    checkbox: false,
  },
})

const name = useField("name")
const phone = useField("phone")
const email = useField("email")
const select = useField("select")
const checkbox = useField("checkbox")
const image = useField("image")
const singleImage = ref(null)

// name.setValue('1')

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"])
const imagesDropzoneOptions = {
  url: "https://httpbin.org/post",
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
  if (response.status === "success") {
    console.log("upload successful")
  } else {
    console.log("upload failed")
  }
}

const submit = handleSubmit((values) => {
  // alert(JSON.stringify(values, null, 2))
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
