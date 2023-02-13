<template>
$END$
</template>
<script setup>
import { defineProps,defineEmits,ref } from 'vue'

const props = defineProps({
  book: Object
})

const emit = defineEmits(['update'])

</script>
<style scoped>
</style>
