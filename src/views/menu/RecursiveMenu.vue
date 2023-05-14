<template>
  <v-list-group v-model="selected">
    <template v-for="item in menuItems" :key="item.id">
      <v-list-item>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-action v-if="item.children" @click="item.expanded = !item.expanded">
          <v-icon>{{ item.expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-slide-y-transition>
        <recursive-menu
          v-if="item.children"
          :menu-items="item.children"
          :selected="selected"
          @update:selected="(value) => (selected = value)"
        />
      </v-slide-y-transition>
    </template>
  </v-list-group>
</template>

<script>
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "RecursiveMenu",
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props) {
    const state = reactive({
      selected: props.selected,
      expandedItems: [],
    })

    function toggle(item) {
      item.expanded = !item.expanded
      if (item.expanded) {
        state.expandedItems.push(item.id)
      } else {
        state.expandedItems.splice(state.expandedItems.indexOf(item.id), 1)
      }
    }

    return {
      toggle,
      state,
    }
  },
})
</script>
