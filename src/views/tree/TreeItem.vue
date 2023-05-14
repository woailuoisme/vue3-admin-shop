<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <div @click="toggle(item)">
        {{ item.title }}
        <span v-if="item.children">[{{ item.expanded ? "-" : "+" }}]</span>
      </div>
      <recursive-menu v-if="item.children && item.expanded" :items="item.children" />
    </li>
  </ul>
</template>

<script>
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "RecursiveMenu",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      items: props.items,
    })

    function toggle(item) {
      if (item.children) {
        item.expanded = !item.expanded
      }
    }

    return {
      state,
      toggle,
    }
  },
})
</script>
