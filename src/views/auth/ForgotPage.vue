<template>
  <v-card class="text-center pa-1">
    <v-card-title class="justify-center text-h4 mb-2">{{ $t("forgot.title") }}</v-card-title>
    <v-card-subtitle>
      {{ $t("forgot.subtitle") }}
    </v-card-subtitle>

    <!-- reset form -->
    <v-card-text>
      <v-form ref="form" v-model="isFormValid" @submit.prevent="submit">
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          class="text-left"
          :error="error"
          :error-messages="errorMessages"
          :label="$t('forgot.email')"
          name="email"
          variant="outlined"
          @keyup.enter="submit"
          @change="resetErrors"
        ></v-text-field>

        <v-btn :loading="isLoading" block size="x-large" color="primary" @click="submit">{{ $t("forgot.button") }}</v-btn>
      </v-form>
    </v-card-text>
    <a class="text-decoration-underline text-center mt-6 cursor-pointer" @click="toLoginModule('sign-in')">
      {{ $t("forgot.backtosign") }}
    </a>
  </v-card>
</template>

<script setup>
import { useRouterPush, useLoading } from "@/hooks"
import { ref } from "vue"

const { toLoginModule } = useRouterPush()
const { loading: isLoading, start, end } = useLoading()
const isFormValid = ref(false)
const email = ref("")
const error = ref(false)
const errorMessages = ref("")
const rules = ref({
  required: (value) => !!value || "Required",
})
const form = ref()

const submit = () => {}
const resetErrors = () => {
  error.value = false
  errorMessages.value = ""
}
</script>
