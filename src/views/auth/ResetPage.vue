<template>
  <v-card class="pa-2">
    <v-card-title class="text-center text-h4 mb-2">Set in 4</v-card-title>
    <div class="overline">{{ status }}</div>
    <div class="error--text mt-2 mb-4">{{ error }}</div>

    <a v-if="error" href="/public">Back to Sign In</a>

    <v-text-field
      v-model="newPassword"
      prepend-inner-icon="mdi-lock"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      variant="outlined"
      name="password"
      label="新密码"
      class="my-4"
      @keyup.enter="confirmPasswordReset"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn :loading="isLoading" block depressed size="x-large" color="primary" @click="confirmPasswordReset">
      Set new password and Sign
    </v-btn>
  </v-card>
</template>

<script setup>
import { useLoading } from "@/hooks"

const { loading: isLoading, start, end } = useLoading()
const newPassword = ref("")
const errorNewPassword = ref(false)
const errorNewPasswordMessage = ref("")
const showPassword = ref(false)
const status = ref("Resetting password")
const error = ref()
const rules = ref({
  required: (value) => (value && Boolean(value)) || "Required",
})

const confirmPasswordReset = () => {
  start()
  setTimeout(() => {
    end()
  }, 1000)
}

const resetErrors = () => {
  errorNewPassword.value = false
  errorNewPasswordMessage.value = ""
}
</script>
