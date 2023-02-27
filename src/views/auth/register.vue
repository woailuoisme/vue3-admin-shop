<script setup>
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <v-card class="auth-card pa-4 pt-7" max-width="448">
      <v-card-item class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <v-card-title class="font-weight-semibold text-2xl text-uppercase">Materio</v-card-title>
      </v-card-item>

      <v-card-text class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Adventure starts here 🚀</h5>
        <p class="mb-0">Make your app management easy and fun!</p>
      </v-card-text>

      <v-card-text>
        <v-form @submit.prevent="() => {}">
          <v-row>
            <!-- Username -->
            <v-col cols="12">
              <v-text-field v-model="form.username" label="Username" />
            </v-col>
            <!-- email -->
            <v-col cols="12">
              <v-text-field v-model="form.email" label="Email" type="email" />
            </v-col>

            <!-- password -->
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <v-checkbox id="privacy-policy" v-model="form.privacyPolicies" inline />
                <v-label for="privacy-policy" style="opacity: 1">
                  <span class="me-1">I agree to</span>
                  <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
                </v-label>
              </div>

              <v-btn block type="submit">Sign up</v-btn>
            </v-col>

            <!-- login instead -->
            <v-col cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <router-link class="text-primary ms-2" to="login">Sign in instead</router-link>
            </v-col>

            <v-col cols="12" class="d-flex align-center">
              <v-divider />
              <span class="mx-4">or</span>
              <v-divider />
            </v-col>

            <!-- auth providers -->
            <v-col cols="12" class="text-center">
              <auth-provider />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-img class="auth-footer-start-tree d-none d-md-block" :src="authV1Tree" :width="250" />

    <v-img :src="authV1Tree2" class="auth-footer-end-tree d-none d-md-block" :width="350" />

    <!-- bg img -->
    <v-img class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
