<template>
  <v-container class="fill-height" fruid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" xm="12">
        <v-card class="elevation-12 blue-grey lighten-4" :loading="loading" :disabled="loading">
          <v-card-title class="justify-center">
            <div class="primary--text h1">知锦优选管理系统</div>
          </v-card-title>
          <v-card-text>
            <v-container fruid>
              <v-form v-model="data.valid">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="data.userInfo.name"
                      :rules="[data.required('用户名')]"
                      label="用户名"
                      name="用户名"
                      prepend-icon="mdi-account"
                      type="email"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="data.userInfo.password"
                      :append-icon="data.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :counter="true"
                      :rules="[data.required('密码'), data.moreThanLength('密码', 4)]"
                      :type="data.showPassword ? 'text' : 'password'"
                      label="密码:"
                      prepend-icon="mdi-lock"
                      @click:append="data.showPassword = !data.showPassword"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-btn :disabled="!data.valid" block color="primary" @click="submitForm">登 录</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import validators from '../../utils/validators'
import { useAuth, useGlobal } from '@/stores'
import router from '@/router'
import { reactive, computed } from 'vue'

const globalStore = useGlobal()
const authStore = useAuth()

const data = reactive({
  valid:true,
  showPassword: false,
  userInfo: {
    name: '',
    password: '',
  },
  ...validators,
})
const loading = computed(() => {
  return globalStore.loading
})

const submitForm = async () => {
  if (await authStore.login(this.userInfo)) {
    setTimeout(() => router.push({ name: 'dashboard' }), 200)
  }
  // this.$emit("submit", userInfo);
}
</script>
