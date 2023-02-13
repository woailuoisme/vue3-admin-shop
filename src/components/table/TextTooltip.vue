<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <div class="primary--text text-ellipsis" v-on="on">{{ text }}</div>
    </template>
    <div style="max-width: 200px">
      <strong>{{ text }}</strong>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
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
