<template>
  <recursive-menu v-model:selected="selected" :menu-items="menuItems" />
</template>

<script>
import RecursiveMenu from "./RecursiveMenu.vue"

export default {
  name: "App",
  components: {
    RecursiveMenu,
  },
  data() {
    return {
      menuItems: [
        { id: 1, title: "菜单项 1" },
        {
          id: 2,
          title: "菜单项 2",
          children: [
            { id: 3, title: "子菜单项 1" },
            {
              id: 4,
              title: "子菜单项 2",
              children: [
                { id: 5, title: "孙菜单项 1" },
                { id: 6, title: "孙菜单项 2" },
              ],
            },
          ],
        },
      ],
      selected: null,
    }
  },
}
</script>
