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
            <v-toolbar-title>提现管理</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.search"
              append-icon="mdi-magnify"
              placeholder="姓名"
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
                        <th class="text-center">id</th>
                        <th class="text-center">姓名</th>
                        <th class="text-center">提现金额</th>
                        <th class="text-center">提现状态</th>
                        <th class="text-center">提现账号</th>
                        <th class="text-center">创建时间</th>
                        <th class="text-center">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in withdraws" :key="index">
                        <td class="text-center">{{ item.id }}</td>
                        <td class="text-center">{{ item.user.nickname }}</td>
                        <td class="text-center">{{ item.amount }}</td>

                        <td class="text-center">
                          <v-chip :color="item.status | statusClass" small>
                            {{ item.status | statusLabel }}
                          </v-chip>
                        </td>

                        <td class="text-center">{{ item.alipay_account }}</td>
                        <td class="text-center">{{ item.created_at }}</td>
                        <td class="text-center">
                          <v-btn v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">
                            处理
                          </v-btn>
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
        <v-dialog v-model="confirmDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">退款处理</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-switch
                      v-model="editedItem.confirmed"
                      inset
                      open-name="通过"
                      close-name="拒绝"
                      :label="`${confirmLabel(editedItem.confirmed)}`"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="editedItem.remark" label="备注" solo/>
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
// import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters({
      breadcrumbs: 'breadcrumb/withdraw',
      withdraws: 'withdraw/getWithdraws',
      isDisplayPagination: 'withdraw/isDisplayPagination',
      meta: 'withdraw/getMeta',
      hasData: 'withdraw/hasData',
      loading: 'share/isLoading',
      findByOrderNum: 'withdraw/findByWithdrawId',
    }),
  },
  created() {
    this.loadAllWithdraws(this.requestParams)
  },
  data() {
    return {
      detailsDialog: false,
      order: {},
      requestParams: {
        page: 1,
        perPage: 15,
        search: '',
      },
      confirmDialog: false,
      editedItem: {
        record_id: 0,
        confirmed: false,
        remark: '',
      },
      defaultItem: {
        record_id: 0,
        confirmed: false,
        remark: '',
      },
    }
  },
  methods: {
    ...mapActions({
      loadAllWithdraws: 'withdraw/loadAllWithdraws',
      confirmedWithdraw: 'withdraw/confirmedWithdraw',
    }),

    isShow(item) {
      if (item.status === 'pending') {
        return true
      } else if (item.status === 'finished') {
        return false
      } else if (item.status === 'rejected') {
        return true
      }
      return false
    },
    detail(item) {
      this.withdraw = this.findByWithdrawId(item.id)
      this.detailsDialog = true
    },
    pageChange(number) {
      this.requestParams.page = number
      this.loadAllWithdraws({
        page: number,
        perPage: this.requestParams.perPage,
        search: this.requestParams.search,
      })
    },
    perPageChange(value) {
      console.log(`perPage ${value}`)
      this.loadAllWithdraws({
        page: this.requestParams.page,
        perPage: value,
        keyword: this.requestParams.keyword,
      })
    },
    loadSearch() {
      this.loadAllWithdraws(this.requestParams)
    },
    confirmLabel($value) {
      if ($value) {
        return '通过'
      } else {
        return '拒绝'
      }
    },
    close() {
      this.confirmDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    confirmedItem(item) {
      this.editedIndex = this.withdraws.indexOf(item)
      this.editedItem = Object.assign(this.editedItem, item)
      this.confirmDialog = true
    },
    save() {
      this.confirmedWithdraw(this.editedItem)
      this.close()
    },
  },
  filters: {
    statusLabel(value) {
      if (value === 'pending') {
        return '已申请'
      } else if (value === 'passed') {
        return '已通过'
      } else if (value === 'rejected') {
        return '已拒绝'
      }
    },
    statusClass(value) {
      if (value === 'pending') {
        return 'primary'
      } else if (value === 'passed') {
        return 'success'
      } else if (value === 'rejected') {
        return 'error'
      }
    },
  },
}
</script>

<style scoped></style>
