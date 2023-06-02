<template>
  <v-card>
    <v-card-title class="text-center red accent-1">提 示</v-card-title>
    <v-divider/>
    <v-card-text class="text-body-1 text-center pt-6"><span>是否确认删除?</span></v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn variant="outlined" color="info" @click="close">取消</v-btn>
      <v-spacer/>
      <v-btn variant="elevated" color="error" @click="confirm">确认</v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  // isShow: {
  //   type:Boolean,
  //   required:true,
  //   default:false
  // }
})
const emit = defineEmits(["close", "confirm"])

// const dialog = ref(props?.isShow)

function close() {
  emit("close")
}

function confirm() {
  emit("confirm")
}
</script>

<style scoped></style>
