<template>
  <v-badge v-bind="avatarBadgeProps">
    <v-avatar style="cursor: pointer" color="primary" variant="tonal">
      <v-img :src="avatar1" />
      <!-- SECTION Menu -->
      <v-menu activator="parent" open-on-hover width="230" scale-transition location="bottom end" offset="14px">
        <v-list>
          <!-- 👉 User Avatar & Name -->
          <v-list-item>
            <template #prepend>
              <v-list-item-action start>
                <v-badge v-bind="avatarBadgeProps">
                  <v-avatar color="primary" size="40" variant="tonal">
                    <v-img :src="avatar1" />
                  </v-avatar>
                </v-badge>
              </v-list-item-action>
            </template>
            <v-list-item-title class="font-weight-semibold">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle class="text-disabled">{{ user?.role }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-2" thickness="3" />

          <!-- 👉 Profile -->
          <v-list-item link>
            <template #prepend>
              <v-icon class="me-2" icon="mdi-account-outline" size="22" />
            </template>
            <v-list-item-title>個人資料</v-list-item-title>
          </v-list-item>

          <!-- 👉 Settings -->
          <!--          <v-list-item link>-->
          <!--            <template #prepend>-->
          <!--              <v-icon class="me-2" icon="mdi-cog-outline" size="22" />-->
          <!--            </template>-->
          <!--            <v-list-item-title>Settings</v-list-item-title>-->
          <!--          </v-list-item>-->

          <!-- 👉 FAQ -->
          <!--          <v-list-item link>-->
          <!--            <template #prepend>-->
          <!--              <v-icon class="me-2" icon="mdi-help-circle-outline" size="22" />-->
          <!--            </template>-->
          <!--            <v-list-item-title>FAQ</v-list-item-title>-->
          <!--          </v-list-item>-->

          <!-- Divider -->
          <v-divider class="my-2" thickness="3" />

          <!-- 👉 Logout -->
          <v-list-item to="/login" @click="userLogout">
            <template #prepend>
              <v-icon class="me-2" icon="mdi-logout-variant" size="22" />
            </template>
            <v-list-item-title>退出登錄</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- !SECTION -->
    </v-avatar>
  </v-badge>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/stores'
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import router from '@/router'

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
const authStore = useAuth()
const isAuthed = computed(() => authStore.isAuthed)
const user = computed(() => authStore.getUser)

const userLogout = async () => {
  if (await authStore.logout()) {
    await router.push({ name: 'login' })
  }
}
</script>
