<template>
  <v-container class="fill-height" fruid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" md="6" sm="8" xm="12">
        <v-form @submit.prevent="submit">
          <v-card class="elevation-12 blue-grey lighten-4" :loading="loading" :disabled="loading">
            <v-card-title class="text-center primary--text h1">{{ title }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    :label="$t('form.label.username')"
                    prepend-icon="mdi-account"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="password.value.value"
                    :error-messages="password.errorMessage.value"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :label="$t('form.label.password')"
                    prepend-icon="mdi-lock"
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn :disabled="!meta.valid" variant="flat" block color="primary" type="submit">{{ $t('form.login') }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuth, useGlobal, useConfig } from '@/stores'
import yup from '@/utils/validation'
import router from '@/router'

const { t } = useI18n()
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
