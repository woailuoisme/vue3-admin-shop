<template>
  <v-container class="fill-height" fruid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" md="6" sm="8" xm="12">
        <v-form @submit.prevent="submit">
          <v-card class="elevation-12 blue-grey lighten-4" :loading="loading" :disabled="loading">
            <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4 text-blue-accent-3 py-4">{{ title }}</v-card-title>
            <v-divider :thickness="2" />
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    variant="outlined"
                    clearable
                    :label="$t('form.label.username')"
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="password.value.value"
                    :error-messages="password.errorMessage.value"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :label="$t('form.label.password')"
                    prepend-inner-icon="mdi-lock"
                    variant="outlined"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <v-checkbox label="记住我" />
                <!--                <a class="ms-2 mb-1" href="javascript:void(0)">Forgot Password?</a> -->
              </div>
              <v-row>
                <v-col cols="12">
                  <v-btn :disabled="!meta.valid" variant="flat" block color="primary" type="submit">{{ $t('form.login') }}</v-btn>
                </v-col>
              </v-row>
              <!--              <VCol cols="12" class="text-center text-base"> -->
              <!--                <span>New on our platform?</span> -->
              <!--                <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">Create an account</RouterLink> -->
              <!--              </VCol> -->
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import i18n from '@/plugins/i18n'
import { computed, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuth, useConfig, useGlobal } from '@/stores'
import yup from '@/utils/validation'
import router from '@/router'
const { t } = i18n.global

const globalStore = useGlobal()
const authStore = useAuth()
const configStore = useConfig()
const title = computed(() => configStore.appName)
const loading = computed(() => globalStore.loading)

let validationSchema = yup.object({
  name: yup.string().required().label(t('form.label.username')),
  password: yup.string().required().min(6).label(t('form.label.password')),
})

const { handleSubmit, meta } = useForm({ validationSchema, validateOnMount: true })

const name = useField('name')
const password = useField('password')

const showPassword = ref(false)
const submit = handleSubmit(async (values) => {
  // alert(JSON.stringify(values, null, 2))
  if (await authStore.login(values)) {
    await router.push({ name: 'dashboard' })
  }
})
</script>

<style scoped></style>
