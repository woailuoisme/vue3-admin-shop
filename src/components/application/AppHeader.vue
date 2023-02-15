<template>
  <v-app-bar v-if="isAuthed && isShowHeader" app class="primary lighten-3" clipped-left>
    <v-app-bar-nav-icon v-if="isAuthed" @click.stop="drawer = !drawer"/>
    <v-toolbar-title class="headline">
      <span>{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-divider class="mx-2" inset vertical/>
    <span v-if="!isAuthed && isShowHeader">
      <v-btn color="primary" tile large to="/login">登录</v-btn>
    </span>
    <v-menu v-else open-on-hover>
      <template v-slot:activator="{ props }">
        <div class="d-flex align-center" v-bind="props">
          <v-avatar color="primary">
            <span class="white--text text-h9">{{ user.name }}</span>
          </v-avatar>
        </div>
      </template>
      <v-list>
        <v-list-item>
          <v-btn text class="red--text darken-3" @click="userLogout">退出登录</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer v-if="isAuthed" v-model="drawer" permanent temporary app>
    <v-list dense>
      <template v-for="item in menuItems">
        <v-list-group color="primary" :prepend-icon="item.prependIcon" v-if="item.children" :value="item.text">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="item.text"></v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :value="child.text"
            :title="child.text"
            :prepend-icon="child.prependIcon"
            :append-icon="`mdi-chevron-right`"
            link
            :to="{ name: child.name }"
          ></v-list-item>
        </v-list-group>
        <v-list-item v-else :prepend-icon="item.prependIcon" :title="item.text" link
                     :to="{ name: item.name }"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useAuth, useMenu, useConfig} from '@/stores'
import router from '@/router'
const authStore = useAuth()
const menuStore = useMenu()
const configStore = useConfig()

const drawer = ref(true)
const menuItems = computed(() => menuStore.getMenuItems)
const isAuthed = computed(() => authStore.isAuthed)
const appName = computed(() => configStore.appName)
const user = computed(() => authStore.getUser)
const isShowHeader = computed(() => router.currentRoute.value.path !== '/login' || router.currentRoute.value.path !== '/')
const userLogout = async () => {
  if (await authStore.logout()) {
    await router.push({name: 'login'})
  }
}
</script>

<style scoped></style>
