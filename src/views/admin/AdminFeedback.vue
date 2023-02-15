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
            <v-toolbar-title>用户反馈</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.search"
              append-icon="mdi-magnify"
              placeholder="ID/姓名"
              single-line
              hide-details
              solo
              @keyup.enter="loadSearch"
              @click:append="loadSearch"
            />
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
                        <th
                          class="text-center"
                          style="pointer-events: auto;cursor: pointer;outline: 0; !important"
                          @click="sortId = !sortId"
                        >
                          id
                          <v-icon v-if="sortId">mdi-chevron-up</v-icon>
                          <v-icon v-if="!sortId">mdi-chevron-down</v-icon>
                        </th>
                        <th class="text-center">反馈人</th>
                        <th class="text-center">内容</th>
                        <th class="text-center">创建时间</th>
                        <th class="text-center">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in feedback" :key="index">
                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">
                          {{ item.user ? item.user.nickname : '' }}
                        </td>

                        <td class="text-center text-ellipsis">
                          <v-tooltip left>
                            <template #activator="{ on }">
                              <span class="primary--text" v-on="on">{{ item.content }}</span>
                            </template>
                            <div class="secondary--text" style="max-width: 200px">
                              <strong>{{ item.content }}</strong>
                            </div>
                          </v-tooltip>
                        </td>
                        <td class="text-center">{{ item.created_at }}</td>
                        <td class="text-center">
                          <v-btn color="info" tile small @click.stop="detail(item)">查看</v-btn>
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
        <v-dialog v-model="detailsDialog" max-width="800">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>反馈详情</v-card-title>
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
                  <tr v-for="(value, key, index) in currentMapFeedback" :key="index">
                    <td class="text-center" style="min-width: 60px !important">{{ value.label }}</td>
                    <td v-if="value.key === 'user'" class="text-center">
                      <v-row align="center" justify="center">
                        <v-col cols="12">
                          <v-avatar>
                            <v-img
                              :src="value.value.avatar"
                              class="d-flex"
                              @error="value.value.avatar = require('@/assets/image/default_image_1.png')"
                            >
                              <template #placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                  <v-progress-circular indeterminate color="primary"/>
                                </v-row>
                              </template>
                            </v-img>
                          </v-avatar>
                          <span class="ml-4">{{ value.value.nickname ?? '' }}</span>
                        </v-col>
                      </v-row>
                    </td>
                    <td v-else-if="value.key === 'images'" class="text-center">
                      <v-row align="center" justify="center">
                        <v-col v-for="(item, key) in value.value" :key="key" cols="3">
                          <v-card>
                            <v-card-text>
                              <v-img
                                :src="item.image_url"
                                class="d-flex"
                                max-width="200px"
                                max-height="200px"
                                @error="item.image_url = require('@/assets/image/default_image_1.png')"
                              >
                                <template #placeholder>
                                  <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="primary"/>
                                  </v-row>
                                </template>
                              </v-img>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </td>
                    <td v-else class="text-center">{{ value.value }}</td>
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
    <pagination-row
      v-if="isDisplayPagination"
      :meta="meta"
      :loading="loading"
      :page.sync="requestParams.page"
      :per-page.sync="requestParams.perPage"
      @pageChange="pageChange"
      @perPageChange="perPageChange"
    />
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters({
      breadcrumbs: 'breadcrumb/feedback',
      feedback: 'feedback/getFeedback',
      isDisplayPagination: 'feedback/isDisplayPagination',
      meta: 'feedback/getMeta',
      hasData: 'feedback/hasData',
      loading: 'share/isLoading',
      findById: 'feedback/findById',
      getMapFeedback: 'feedback/getMapFeedback',
    }),
    locationName() {
      return this.user.location ? this.user.location.name : ''
    },
  },
  created() {
    this.loadAllFeedback(this.requestParams)
  },

  mounted() {
    // debugger
  },

  data() {
    return {
      detailsDialog: false,
      currentFeedback: {},
      currentMapFeedback: {},
      requestParams: {
        page: 1,
        perPage: 10,
        search: '',
      },
      sortId: false,
    }
  },
  methods: {
    ...mapActions({
      loadAllFeedback: 'feedback/loadAllFeedback',
    }),
    detail(item) {
      this.currentFeedback = this.findById(item.id)
      this.currentMapFeedback = this.getMapFeedback(item.id)
      this.detailsDialog = true
    },
    pageChange(value) {
      console.log(`page ${value}`)
      this.requestParams.page = value
      this.loadAllFeedback(this.requestParams)
    },
    perPageChange(value) {
      console.log(`perPage ${value}`)
      this.requestParams.perPage = value
      this.loadAllFeedback(this.requestParams)
    },
    loadSearch() {
      this.loadAllFeedback(this.requestParams)
    },
  },
  filters: {
    activeColor(value) {
      if (value) {
        return 'success'
      } else {
        return 'error'
      }
    },
  },
}
</script>

<style scoped>
.text-ellipsis {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
