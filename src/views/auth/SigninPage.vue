<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center text-h4 mb-2 font-weight-regular">Welcome</v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-text-field
            v-model="email"
            class="text-left"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            :label="$t('login.email')"
            variant="outlined"
            clearable
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="password"
            class="text-left"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('login.password')"
            name="password"
            variant="outlined"
            clearable
            @change="resetErrors"
            @keyup.enter="submit"
            @click:appendInner="showPassword = !showPassword"
          ></v-text-field>

          <v-btn :loading="isLoading" :disabled="isLoading" block size="x-large" color="primary" @click="submit">
            {{ $t("login.button") }}
          </v-btn>

          <div class="text-caption font-weight-bold text-uppercase my-3">{{ $t("login.orsign") }}</div>

          <!-- external providers list -->
          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isLoading"
            class="mb-2 bg-primary-lighten-2 lighten-2 text-primary-darken-3"
            block
            size="x-large"
            to="/"
          >
            <v-icon size="small" start>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>
        </v-form>
        <a class="mt-5 text-decoration-underline" style="cursor: pointer" @click="toLoginModule('forgot')">
          {{ $t("login.forgot") }}
        </a>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t("login.noaccount") }}
      <a style="cursor: pointer" class="font-weight-bold text-decoration-underline" @click="toLoginModule('sign-up')">
        {{ $t("login.create") }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, storeToRefs } from "vue"
import { useRouterPush } from "@/composables"
import { useAuthStore } from "@/store"

const auth = useAuthStore()
const { loginLoading: isLoading } = storeToRefs(auth)
const { login } = useAuthStore()
const { toLoginModule } = useRouterPush()
const form = ref()
const isFormValid = ref(false)
const email = ref("admin")
const password = ref("admin123")
const error = ref(false)
const errorMessages = ref("")
const errorProvider = ref(false)
const errorProviderMessages = ref("")
const showPassword = ref(false)
const providers = ref([
  {
    id: "google",
    label: "Google",
    isLoading: false,
  },
  {
    id: "facebook",
    label: "Facebook",
    isLoading: false,
  },
])
const rules = ref({
  required: (value) => (value && Boolean(value)) || "Required",
})

const submit = () => {
  form.value?.validate().then(async (r) => {
    if (r.valid) {
      await login(email.value, password.value)
    }
  })
}
const resetErrors = () => {
  error.value = false
  errorMessages.value = ""
  errorProvider.value = false
  errorProviderMessages.value = ""
}
</script>
