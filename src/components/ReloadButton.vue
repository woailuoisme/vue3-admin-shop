<template>
  <v-tooltip text="重新加载">
    <template #activator="{ props }">
      <v-icon
        v-bind="props"
        size="lg"
        color="success"
        :class="{ 'animate-spin': loading }"
        icon="mdi-refresh"
        @click.stop="refresh"
      ></v-icon>
    </template>
  </v-tooltip>
</template>

<script setup>
import { useLoading } from "@/hooks"
const emit = defineEmits(["refresh"])

defineOptions({ name: "ReloadButton" })

const { loading, start, end } = useLoading()

const refresh = () => {
  start()
  emit("refresh")
  end()
}
</script>

<style scoped></style>
