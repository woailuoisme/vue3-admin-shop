<template>
    <v-card>
      <v-card-title class="text-center red accent-1">提 示</v-card-title>
      <v-card-text class="text-h5 text-center pt-6"><span>是否确认删除?</span></v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn variant="flat" color="blue lighten-2 " text @click="close">取消</v-btn>
        <v-spacer/>
        <v-btn variant="flat" color="error darken-1" @click="confirm">确认</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
</template>
<script setup>
import {defineEmits, defineProps, onMounted, ref, watch} from 'vue'

const props = defineProps({
})
const emit = defineEmits(['update:open', 'close', 'confirm'])
// watch(dialog, (newValue, oldValue) => {
//   emit('update:open', newValue)
// })

function close() {
  emit('close')
}

function confirm() {
  emit('confirm')
}
</script>
<style scoped>
</style>
