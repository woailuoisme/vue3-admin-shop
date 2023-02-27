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
              <v-textarea v-model="editedItem.description" label="产品描述" :rules="[rule.required('产品描述')]" hint="产品描述" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="7">
              <v-file-input
                v-model="editedItem.thumbnail"
                chips
                show-size
                variant="outlined"
                prepend-icon="mdi-camera"
                accept="image/png, image/jpeg, image/bmp"
                :rules="[rule.required('产品封面图')]"
                label="产品缩略图"
              />
            </v-col>
            <!--            <v-col cols="3" class="pl-3" v-if="editedIndex > 0"> -->
            <v-col cols="3" class="pl-3">
              <v-fab-transition>
                <v-row align="center">
                  <v-img :src="editedItem.thumbnail ?? ''" max-width="100" aspect-ratio="1" />
                </v-row>
              </v-fab-transition>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-autocomplete
                v-model="editedItem.category_id"
                item-title="name"
                item-value="id"
                :items="categories"
                chips
                solo
                label="产品分类"
                :rules="[rule.required('产品分类')]"
              />
            </v-col>
            <v-col cols="3">
              <v-switch v-model="editedItem.is_sale" color="primary" inset :label="`是否上线？答：${saleLabel(editedItem.is_sale)}`" />
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="editedItem.sale_price"
                label="销售价格"
                :rules="[rule.required('销售价格')]"
                type="number"
                step="0.01"
              />
            </v-col>

            <v-col cols="3">
              <v-text-field v-model="editedItem.stock" label="库存" type="number" :rules="[rule.required('库存')]" step="1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="title">产品内容</div>
              <my-editor v-model="editedItem.content" :rules="[rule.required('产品内容')]" img-upload-url="http://localhost/" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="title">产品展示图组</div>
              <vue-dropzone
                id="dropzone-1"
                ref="productImages"
                use-custom-slot
                :options="imagesDropzoneOptions"
                @vdropzone-complete="afterUploadComplete"
              >
                <div class="dropzone-custom-content">
                  <div>
                    <v-icon x-large>mdi-image-plus-outline</v-icon>
                  </div>
                  <h3 class="dropzone-custom-title mt-4">
                    <v-btn tile color="success" class="mt-3">点击或拖拽上传</v-btn>
                  </h3>
                </div>
              </vue-dropzone>
            </v-col>
          </v-row>
          <v-row v-if="editedItem?.images?.length > 0">
            <v-col v-for="(item, index) in editedItem.images" :key="index" cols="4">
              <v-hover v-slot="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-row align="center" justify="center">
                    <v-img :src="item.image" class="d-flex mt-3" :aspect-ratio="6 / 5" @error="item.image = defaultImage">
                      <template #placeholder>
                        <v-row class="d-flex align-center justify-center fill-height">
                          <v-progress-circular indeterminate color="primary" />
                        </v-row>
                      </template>
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                          style="height: 100%"
                        >
                          <v-row class="fill-height flex-column" align="center" justify="center">
                            <div class="align-self-center">
                              <!--                              <v-btn color="error" @click.stop="deleteProductImage(item)">删除</v-btn> -->
                            </div>
                          </v-row>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-row>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="flat" color="blue darken-1" text @click="close">取消</v-btn>
      <v-btn variant="flat" :disabled="!valid" color="primary" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import defaultImage from '@/assets/image/default_image_1.png'
import { defineEmits, defineProps, reactive, ref } from 'vue'
import { saleLabel } from '@/utils/table'
import validators from '@/utils/validators'
import MyEditor from '@/components/myEditor'

const props = defineProps({
  isNew: {
    type: Boolean,
    default: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },

  item: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['save', 'close'])
const valid = ref(false)
const editedItem = reactive(props.item)
const rule = reactive({ ...validators })
const imagesDropzoneOptions = {
  url: 'https://httpbin.org/post',
  thumbnailWidth: 150,
  maxFilesize: 2,
  // acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
  parallelUploads: 3,
  maxFiles: 3,
  uploadMultiple: true,
  autoProcessQueue: false,
  addRemoveLinks: true,
}

async function afterUploadComplete(response) {
  if (response.status === 'success') {
    console.log('upload successful')
  } else {
    console.log('upload failed')
  }
}

async function mediaUpload(blobInfo, success, failure) {
  let data = new FormData()
  data.append('image', blobInfo.blob(), blobInfo.filename())
  try {
    // const res = await api().post('/common/media_upload', data)
    // success(res.data.data)
  } catch (err) {
    failure('HTTP Error: ' + err.message)
  }
}

function save(value) {
  emit('save', value)
}

function close() {
  emit('close')
}
</script>

<style scoped></style>
