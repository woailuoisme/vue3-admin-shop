<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">修改</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="title">内容</div>
            <editor-md></editor-md>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="close">关闭</v-btn>
      <v-btn color="primary" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, reactive, ref, watch } from "vue"
import { TME_IMAGE_UPLOAD } from "@/utils/urls"

const props = defineProps({
  // isNew: {
  //   type: Boolean,
  //   required: true
  // },
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["save", "close"])

const valid = ref(false)

const editedItem = reactive(props.item)

function save(value) {
  emit("save", value)
}

function close() {
  emit("close")
}
</script>

<style scoped></style>
