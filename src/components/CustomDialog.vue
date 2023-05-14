<template>
  <v-dialog
    v-model="dialogVisible"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :max-width="maxWidth"
    :max-height="maxHeight"
    @keydown.esc.prevent="closeDialog"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-btn text @click="closeDialog">{{ cancelText }}</v-btn>
          <v-btn color="primary" text @click="confirm">{{ confirmText }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: [String, Number],
    default: "none",
  },
  maxHeight: {
    type: [String, Number],
    default: "none",
  },
  value: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["update:modelValue", "update:confirm"])
const dialogVisible = ref(props.value)

watch(
  () => props.value,
  (value) => {
    dialogVisible.value = value
  },
)

const closeDialog = () => {
  dialogVisible.value = false
  emit("update:modelValue", false)
}

const confirm = () => {
  closeDialog()
  emit("update:confirm")
}

onMounted(() => {
  dialogVisible.value = props.value
})
</script>
