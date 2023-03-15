<script setup>
import { ref } from "vue"
import avatar1 from "@/assets/images/avatars/avatar-1.png"

const accountData = {
  avatarImg: avatar1,
  firstName: "john",
  lastName: "Doe",
  email: "johnDoe@example.com",
  org: "ThemeSelection",
  phone: "+1 (917) 543-9876",
  address: "123 Main St, New York, NY 10001",
  state: "New York",
  zip: "10001",
  country: "USA",
  language: "English",
  timezone: "(GMT-11:00) International Date Line West",
  currency: "USD",
}

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [(v) => !!v || "Please confirm account deactivation"]
const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}
const changeAvatar = (file) => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}
const timezones = [
  "(GMT-11:00) International Date Line West",
  "(GMT-11:00) Midway Island",
  "(GMT-10:00) Hawaii",
  "(GMT-09:00) Alaska",
  "(GMT-08:00) Pacific Time (US & Canada)",
  "(GMT-08:00) Tijuana",
  "(GMT-07:00) Arizona",
  "(GMT-07:00) Chihuahua",
  "(GMT+00:00) London",
]
const currencies = ["USD", "EUR", "GBP", "AUD", "BRL", "CAD", "CNY", "CZK", "DKK", "HKD", "HUF", "INR"]
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card title="Account Details">
        <v-card-text class="d-flex">
          <!-- 👉 Avatar -->
          <v-avatar rounded="lg" size="100" class="me-6" :image="accountDataLocal.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form ref="refForm" class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <v-btn color="primary" @click="refInputEl?.click()">
                <v-icon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </v-btn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" />

              <v-btn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <v-icon icon="mdi-refresh" class="d-sm-none" />
              </v-btn>
            </div>

            <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </form>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <!-- 👉 Form -->
          <v-form class="mt-6">
            <v-row>
              <!-- 👉 First Name -->
              <v-col md="6" cols="12">
                <v-text-field v-model="accountDataLocal.firstName" label="First Name" />
              </v-col>

              <!-- 👉 Last Name -->
              <v-col md="6" cols="12">
                <v-text-field v-model="accountDataLocal.lastName" label="Last Name" />
              </v-col>

              <!-- 👉 Email -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.email" label="E-mail" type="email" />
              </v-col>

              <!-- 👉 Organization -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.org" label="Organization" />
              </v-col>

              <!-- 👉 Phone -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.phone" label="Phone Number" />
              </v-col>

              <!-- 👉 Address -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.address" label="Address" />
              </v-col>

              <!-- 👉 State -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.state" label="State" />
              </v-col>

              <!-- 👉 Zip Code -->
              <v-col cols="12" md="6">
                <v-text-field v-model="accountDataLocal.zip" label="Zip Code" />
              </v-col>

              <!-- 👉 Country -->
              <v-col cols="12" md="6">
                <v-select v-model="accountDataLocal.country" label="Country" :items="['USA', 'Canada', 'UK', 'India', 'Australia']" />
              </v-col>

              <!-- 👉 Language -->
              <v-col cols="12" md="6">
                <v-select v-model="accountDataLocal.language" label="Language" :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']" />
              </v-col>

              <!-- 👉 Timezone -->
              <v-col cols="12" md="6">
                <v-select v-model="accountDataLocal.timezone" label="Timezone" :items="timezones" :menu-props="{ maxHeight: 200 }" />
              </v-col>

              <!-- 👉 Currency -->
              <v-col cols="12" md="6">
                <v-select v-model="accountDataLocal.currency" label="Currency" :items="currencies" :menu-props="{ maxHeight: 200 }" />
              </v-col>

              <!-- 👉 Form Actions -->
              <v-col cols="12" class="d-flex flex-wrap gap-4">
                <v-btn>Save changes</v-btn>

                <v-btn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">Reset</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <!-- 👉 Delete Account -->
      <v-card title="Delete Account">
        <v-card-text>
          <!-- 👉 Checkbox and Button  -->
          <v-alert color="warning" variant="tonal" class="mb-4">
            <v-alert-title class="mb-1">Are you sure you want to delete your account?</v-alert-title>
            <p class="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
          </v-alert>
          <div>
            <v-checkbox v-model="isAccountDeactivated" :rules="validateAccountDeactivation" label="I confirm my account deactivation" />
          </div>

          <v-btn :disabled="!isAccountDeactivated" color="error" class="mt-3">Deactivate Account</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
