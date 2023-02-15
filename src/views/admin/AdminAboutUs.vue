<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <Breadcrumb :items="breadcrumbs"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>协议管理</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" :disabled="loading">
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col v-if="!hasData" class="text-center" cols="12">暂无数据</v-col>
                <v-col v-else cols="12">
                  <v-simple-table>
                    <template #default>
                      <thead>
                      <tr>
                        <th class="text-center">id</th>
                        <th class="text-center">类型</th>
                        <th class="text-center">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in about" :key="index">
                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ typeLabel(item.type) }}</td>
                        <td class="text-center">
                          <v-btn color="info" tile small @click.stop="editItem(item)">修改</v-btn>
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" max-width="1300px">
          <v-card>
            <v-card-title>
              <span class="text-h5">修改</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div class="title">内容</div>
                    <EditorTinyMCE v-model="editedItem.content" :upload-handler="mediaUpload"/>
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
        </v-dialog>
        <v-dialog v-model="detailsDialog" max-width="800">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>订单详情</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template #default>
                  <thead>
                  <tr>
                    <th class="text-center">关键字</th>
                    <th class="text-center">值</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(value, key, index) in order" :key="index">
                    <td class="text-center">{{ key }}</td>
                    <td class="text-center">{{ value }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" text @click="detailsDialog = false">确定</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {trim} from 'lodash/string'
import api from '@/api/api'

export default {
  components: {},
  computed: {
    ...mapGetters({
      breadcrumbs: 'breadcrumb/aboutUs',
      about: 'aboutUs/getAbouts',
      hasData: 'aboutUs/hasData',
      loading: 'share/isLoading',
    }),
  },
  created() {
    this.loadAllAbouts(this.requestParams)
  },
  data() {
    return {
      dialog: false,
      detailsDialog: false,
      order: {},
      requestParams: {
        page: 1,
        search: '',
      },
      editedItem: {
        content: '',
      },
      defaultItem: {
        content: '',
      },
    }
  },
  methods: {
    ...mapActions({
      loadAllAbouts: 'aboutUs/loadAllAbouts',
      updateAbout: 'aboutUs/updateAbout',
    }),
    detail(item) {
      this.order = this.findByOrderNum(item.id)
      this.detailsDialog = true
    },

    typeLabel(value) {
      if (trim(value) === 'about_us') {
        return '关于我们'
      } else if (trim(value) === 'user_agreement') {
        return '用户协议'
      } else if (trim(value) === 'privacy_agreement') {
        return '隐私协议'
      }
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    editItem(item) {
      // this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign(this.editedItem, item)
      this.dialog = true
    },
    save() {
      this.updateAbout(this.editedItem)
      this.close()
    },
  (blobInfo, success, failure)
{
  let data = new FormData()
  data.append('image', blobInfo.blob(), blobInfo.filename())
  // debugger;
  api()
    .post('/common/media_upload', data)
    .then(function (res) {
      success(res.data.data)
    })
    .catch(function (err) {
      failure('HTTP Error: ' + err.message)
    })
}
,
},
filters: {
}
,
}
</script>

<style scoped></style>
