<template>
    <v-app-bar app class="primary lighten-3" clipped-left>
      <v-app-bar-nav-icon v-if="isAuthed" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline">
        <span>知锦优选</span>
      </v-toolbar-title>
      <v-spacer />
      <v-divider class="mx-2" inset vertical />
      <span v-if="!isAuthed && !isShowHeader">
        <v-btn color="primary" tile large to="/login">登录</v-btn>
      </span>
      <v-menu v-if="isAuthed" open-on-hover bottom offset-y>
        <template v-if="isAuthed" #activator="{ on }">
          <div class="d-flex align-center" v-on="on">
            <v-avatar color="primary">
              <span class="white--text text-h9">{{ user.name }}</span>
            </v-avatar>
          </div>
        </template>
        <v-list>
          <v-btn text class="red--text darken-3" @click="userLogout">退出登录</v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-if="isAuthed" v-model="drawer" app>
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
            ></v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :prepend-icon="item.prependIcon"
            :title="item.text"
            link
            :to="{ name: item.name }"
          ></v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuth, useMenu } from '@/stores'
import router from '@/router'
// const drawer = ref(false)
/** Global Store */
const authStore = useAuth()
const menuStore = useMenu()

const drawer = ref(false)
const menuItems = computed(() => menuStore.getMenuItems)
const isAuthed = computed(() => authStore.isAuthed)
const user = computed(() => authStore.getUser)
const isShowHeader = computed(() => router.path === '/login')
const userLogout = async () => {
  if (await authStore.logout()) {
    await router.push({ name: 'login' })
  }
}
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
