<template>
  <v-app-bar v-if="isAuthed && isShowHeader" app class="primary lighten-3" clipped-left>
    <v-app-bar-nav-icon v-if="isAuthed" @click.stop="drawer = !drawer" />
    <v-toolbar-title class="headline">
      <span>{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer />
    <span>
      <theme-switcher></theme-switcher>
    </span>
    <v-divider class="mx-2" inset vertical thickness="3" />
    <span v-if="!isAuthed && isShowHeader">
      <v-btn color="primary" tile large to="/login">登录</v-btn>
    </span>
    <user-profile v-else></user-profile>
  </v-app-bar>

  <v-navigation-drawer v-if="isAuthed" v-model="drawer" permanent temporary app>
    <template #prepend>
      <v-list-item border lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg" :title="user.name" />
    </template>

    <v-list bg-color="gray" dense>
      <template v-for="(item, index) in menuItems" :key="index">
        <v-list-group v-if="item.children" active-color="primary" color="primary" :prepend-icon="item.prependIcon" :value="item.text">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="item.text" />
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            active-color="primary"
            :value="child.text"
            :title="child.text"
            :prepend-icon="child.prependIcon"
            append-icon="mdi-chevron-right"
            :to="{ name: child.name }"
            link
          />
        </v-list-group>
        <v-list-item v-else active-color="primary" :prepend-icon="item.prependIcon" :title="item.text" link :to="{ name: item.name }" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuth, useConfig, useMenu } from '@/stores'
import router from '@/router'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import UserProfile from './UserProfile'

const authStore = useAuth()
const menuStore = useMenu()
const configStore = useConfig()

const drawer = ref(true)
const menuItems = computed(() => menuStore.getMenuItems)
const isAuthed = computed(() => authStore.isAuthed)
const user = computed(() => authStore.getUser)
const appName = computed(() => configStore.appName)
const isShowHeader = computed(() => configStore.isShowHeader)

const userLogout = async () => {
  if (await authStore.logout()) {
    await router.push({ name: 'login' })
  }
}
</script>

<style scoped></style>
