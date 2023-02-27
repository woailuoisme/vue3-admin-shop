<template>
  <v-container fluid>
    <v-row>
      <v-col col="12">
        <v-toolbar>
          <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>

        <v-divider thickness="4" />

        <v-card class="my-2">
          <v-tabs v-model="tab" color="primary" align-tabs="start">
            <v-tab value="one">
              <v-icon start>mdi-account</v-icon>
              Account
            </v-tab>
            <v-divider vertical thickness="2" />
            <v-tab value="two">
              <v-icon start>mdi-lock</v-icon>
              Security
            </v-tab>
            <v-divider vertical thickness="2" />
            <v-tab value="three">
              <v-icon start>mdi-access-point</v-icon>
              Notifications
            </v-tab>
          </v-tabs>
        </v-card>
        <v-card>
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-card flat>
                <v-card-title>Account Details</v-card-title>
                <v-card-text class="d-flex">
                  <v-avatar rounded="lg" size="100" class="me-6" />
                  <form ref="refForm" class="d-flex flex-column justify-center gap-5">
                    <div class="d-flex flex-wrap gap-2">
                      <v-btn prepend-icon="mdi-cloud-upload-outline" color="primary">Upload new photo</v-btn>
                      <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden />
                      <v-btn prepend-icon="mdi-refresh" type="reset" color="error" variant="tonal">Reset</v-btn>
                    </div>
                    <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                  </form>
                </v-card-text>
                <v-divider class="my-4" thickness="2" />
                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col col="6">
                        <v-text-field label="firstName" />
                      </v-col>
                      <v-col col="6">
                        <v-text-field label="firstName" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col col="6">
                        <v-text-field label="firstName" />
                      </v-col>
                      <v-col col="6">
                        <v-text-field label="firstName" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col col="6">
                        <v-select label="Language" :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']" />
                      </v-col>
                      <v-col col="6">
                        <v-select label="Language" :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn>save changes</v-btn>
                        <v-btn class="ml-4" color="secondary">reset</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="two">
              <account-settings-security />
            </v-window-item>
            <v-window-item value="three">
              <account-settings-notification />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
const tab = ref('Account')
import AccountSettingsAccount from '@/views/components/adminUserProfile/AccountSettingsAccount'
import AccountSettingsNotification from '@/views/components/adminUserProfile/AccountSettingsNotification'
import AccountSettingsSecurity from '@/views/components/adminUserProfile/AccountSettingsSecurity'
</script>

<style scoped></style>
