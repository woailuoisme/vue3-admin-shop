<template>
  <v-app-bar v-if="isAuthed" app class="primary lighten-3" clipped-left>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    <v-toolbar-title class="headline">
      <span>{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <header-search></header-search>
    <v-divider class="mx-2" inset vertical thickness="1"/>
    <language-change></language-change>
    <header-full-screen></header-full-screen>
    <theme-switcher></theme-switcher>
    <menu-notifications></menu-notifications>
    <v-divider class="mx-2" inset vertical thickness="1"/>
    <menu-profile></menu-profile>
  </v-app-bar>

  <v-navigation-drawer v-if="isAuthed" v-model="drawer" permanent temporary rounded expand-on-hover app>
    <!--    <v-list color="transparent"> -->
    <!--      <v-list-item :prepend-avatar="user?.avatar ?? avatar1" :title="user?.name" :subtitle="user?.role"></v-list-item> -->
    <!--    </v-list> -->
    <v-divider></v-divider>
    <v-list color="transparent" dense>
      <template v-for="(item, index) in menuItems" :key="index">
        <v-list-group v-if="item.children" color="primary" :prepend-icon="item.prependIcon" :value="item.text">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="item.text"/>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :value="child.text"
            :title="child.text"
            append-icon="mdi-chevron-right"
            :to="{ name: child.name }"
            link>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :prepend-icon="item.prependIcon" :title="item.text" link :to="{ name: item.name }"/>
      </template>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block @click.stop="authStore.logout">登出</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import {useAuth, useConfig, useMenu} from "@/stores"
import ThemeSwitcher from "@/layout/application/header/ThemeSwitcher"
import MenuProfile from "./header/MenuProfile"
import MenuNotifications from "@/layout/application/header/MenuNotifications"
import LanguageChange from "@/layout/application/header/LanguageChange"
import HeaderSearch from "@/layout/application/header/HeaderSearch"
import HeaderFullScreen from "@/layout/application/header/HeaderFullScreen"

const authStore = useAuth()
const menuStore = useMenu()
const configStore = useConfig()

const drawer = ref(true)
const menuItems = computed(() => menuStore.getMenuItems)
const user = computed(() => authStore.getUser)
const appName = computed(() => configStore.appName)
const isAuthed = computed(() => authStore.isAuthed)
</script>

<style scoped></style>
