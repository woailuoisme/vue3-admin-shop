<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ isNew ? '新增' : '编辑' }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" label="名称" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <!--              <v-autocomplete-->
              <!--                v-model="editedItem.parent_id"-->
              <!--                item-text="name"-->
              <!--                item-value="id"-->
              <!--                :items="selectedCategories"-->
              <!--                chips-->
              <!--                solo-->
              <!--                label="产品分类"-->
              <!--              />-->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.order" label="排序" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="7">
              <v-file-input
                ref="file"
                v-model="editedItem.imageFile"
                chips
                show-size
                prepend-icon="mdi-camera"
                accept="image/png, image/jpeg, image/bmp"
                label="轮播图"
              />
            </v-col>
            <v-col cols="3" class="pl-3">
              <v-fab-transition>
                <v-row align="center">
                  <v-img :src="editedItem.image_url" max-width="100" aspect-ratio="1" />
                </v-row>
              </v-fab-transition>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="close">取消</v-btn>
      <v-btn color="blue darken-1" text @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { defineEmits, defineProps, onMounted, reactive, ref, watch } from 'vue'

const valid = ref(false)
let entity = reactive({
  name: '',
  email: '',
  password: null,
  avatar: null,
  avatarFile: [],
  role: '',
})

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: true,
    default: {
      image: '',
      imageFile: [],
      image_url: '',
      name: '',
      order: 0,
      parent_id: null,
    },
  },
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
<style scoped></style>
