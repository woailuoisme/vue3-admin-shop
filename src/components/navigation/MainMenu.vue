<template>
  <v-list nav>
    <div v-for="(item, index) in menu" :key="index">
      <div v-if="item.label" class="pa-1 mt-2 overline">{{ $t(item.label) }}</div>
      <nav-menu :menu="item.children"/>
    </div>
  </v-list>
</template>

<script setup>

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
})
</script>
