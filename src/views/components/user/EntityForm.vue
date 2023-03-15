<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ isNew ? "新增" : "编辑" }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="entity.name" label="名称" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="entity.email" label="email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="entity.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                counter
                :type="showPassword ? 'text' : 'password'"
                label="密码:"
                prepend-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="entity.role"
                item-title="name"
                item-value="value"
                :items="roleList"
                variant="underlined"
                label="角色"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="7">
              <v-file-input ref="file" v-model="entity.avatarFile" chips prepend-icon="mdi-camera" label="头像" />
            </v-col>
            <v-col cols="3" class="pl-3">
              <v-fab-transition>
                <v-row align="center">
                  <v-img :src="entity.avatar" max-width="100" aspect-ratio="1" />
                </v-row>
              </v-fab-transition>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="tonal" color="blue darken-1" text @click="close">取消</v-btn>
      <v-btn variant="outlined" color="blue darken-1" text @click="save(entity)">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, reactive, ref, watch } from "vue"

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(["save", "close"])
const showPassword = ref(false)
const valid = ref(false)
let entity = reactive({
  name: "",
  email: "",
  password: null,
  avatar: null,
  avatarFile: [],
  role: "",
})

onMounted(() => {
  entity = props.item
})

const roleList = [
  {
    name: "管理员",
    value: "admin",
  },
  {
    name: "普通用户",
    value: "general",
  },
]

function save(value) {
  emit("save", value)
}

function close() {
  emit("close")
}
</script>

<style scoped></style>
