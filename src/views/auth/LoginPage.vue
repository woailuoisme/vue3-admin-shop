<template>
  <v-card :disabled="loading" :loading="loading" class="elevation-12 blue-grey lighten-4" max-width="448">
    <v-form @keydown.enter="submit" @submit.prevent="submit">
      <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4 text-blue-darken-1 py-4">{{ title }}</v-card-title>
      <v-divider :thickness="2" />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              :label="$t('form.label.username')"
              clearable
              prepend-inner-icon="mdi-account"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password.value.value"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :error-messages="password.errorMessage.value"
              :label="$t('form.label.password')"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
            />
          </v-col>
        </v-row>
        <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
          <!--          <v-checkbox label="记住我" /> -->
          <v-checkbox>
            <template #label>
              <div>
                记住我
                <!--                ,I agree that -->
                <!--                <v-tooltip location="bottom"> -->
                <!--                  <template v-slot:activator="{ props }"> -->
                <!--                    <a target="_blank" href="https://vuetifyjs.com" v-bind="props" @click.stop>Vuetify -->
                <!--                    </a> -->
                <!--                  </template> -->
                <!--                  Opens in new window -->
                <!--                </v-tooltip> -->
                <!--                is awesome -->
              </div>
            </template>
          </v-checkbox>
          <!--                <a class="ms-2 mb-1" href="javascript:void(0)">Forgot Password?</a> -->
        </div>
        <v-row>
          <v-col cols="12">
            <v-btn :disabled="!meta.valid" block color="primary" type="submit" variant="flat">{{ $t("form.login") }}</v-btn>
          </v-col>
        </v-row>
        <!--              <VCol cols="12" class="text-center text-base"> -->
        <!--                <span>New on our platform?</span> -->
        <!--                <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">Create an account</RouterLink> -->
        <!--              </VCol> -->
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script setup>
import { useAuth, useConfig, useGlobal } from "@/stores"
import yup from "@/utils/validation"
import router from "@/router"

const { t } = useI18n()

const globalStore = useGlobal()
const authStore = useAuth()
const configStore = useConfig()
const { appName: title } = storeToRefs(configStore)
const { loading } = storeToRefs(globalStore)

let validationSchema = yup.object({
  name: yup.string().name(),
  password: yup.string().required().min(6).label(t("form.label.password")),
})

const { handleSubmit, meta } = useForm({ validationSchema, validateOnMount: true })

const name = useField("name")
const password = useField("password")

const showPassword = ref(false)
const submit = handleSubmit(async (values) => {
  if (await authStore.login(values)) {
    await router.push({ name: "dashboard" })
  }
})
</script>

<style scoped></style>
