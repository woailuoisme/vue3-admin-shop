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
            <myEditor v-model="editedItem.content" :imgUploadUrl="TME_IMAGE_UPLOAD"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="blue darken-1" text @click="close">关闭</v-btn>
      <v-btn color="primary" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import myEditor from "@/components/myEditor";
import {defineEmits, defineProps, onMounted, reactive, ref, watch} from 'vue'
import {TME_IMAGE_UPLOAD} from '@/utils/urls'

const valid = ref(false)

const props = defineProps({
  // isNew: {
  //   type: Boolean,
  //   required: true
  // },
  item: {
    type: Object,
    required: true,
    default: {
      order: '',
      image: null,
    }
  }
})
const editedItem = reactive(props.item)

const emit = defineEmits(['save', 'close'])

function save(value) {
  emit('save', value)
}

function close() {
  emit('close')
}
</script>
<style scoped>
</style>
