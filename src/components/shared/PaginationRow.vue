<template>
  <v-row class="my-4">
    <v-col cols="12">
      <v-card>
        <v-row align="center" justify="space-around">
          <v-col cols="7">
            <v-row align="center" justify="space-around">
              <v-col cols="2">
                <v-select
                  v-model="modelPerPage"
                  :items="selectPerPageList"
                  item-text="name"
                  item-value="value"
                  :loading="loading"
                  :disabled="loading"
                  label="页量"
                  dense
                  single-line
                  solo
                  hide-details
                  @change="$emit('perPageChange', modelPerPage)"
                />
              </v-col>
              <v-col cols="10">
                <div>
                  <span>
                    第
                    <strong>{{ meta.current_page }}/{{ meta.last_page }}</strong>
                    页
                  </span>
                  <span>
                    (
                    <strong>{{ meta.from }}</strong>
                    ~
                    <strong>{{ meta.to }}</strong>
                    )&nbsp;
                  </span>
                  <span>
                    总数:
                    <strong>{{ meta.total }}</strong>
                    条&nbsp;
                  </span>
                  <span>
                    每页:
                    <strong>{{ meta.per_page }}</strong>
                    条
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-pagination
              v-model="modelPage"
              :disabled="loading"
              :length="meta.last_page"
              :total-visible="5"
              :value="meta.current_page"
              @input="$emit('pageChange', modelPage)"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    meta: {
      type: Object,
      default: () => {
        return {
          per_page: 10,
          last_page: 5,
          current_page: 1,
          total: 100,
          from: 1,
          to: 7,
        }
      },
    },
  },
  data() {
    return {
      modelPage: this.page,
      modelPerPage: this.perPage,
      selectPerPageList: [
        {
          name: '10',
          value: 10,
        },
        {
          name: '15',
          value: 15,
        },
        {
          name: '20',
          value: 20,
        },
      ],
    }
  },
  methods: {
    perPageChange(value) {
      console.log(`per_page ${value}`)
      this.$emit('update:perPage', this.modelPerPage)
    },
    pageChange(value) {
      console.log(`page ${value}`)
      this.$emit('update:page', this.modelPage)
    },
  },
}
</script>

<style scoped></style>
