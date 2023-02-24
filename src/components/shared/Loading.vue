<template>
  <v-dialog v-model="loading" persistent width="300">
    <v-card class="pt-4">
      <v-card-text class="justify-center text-center">
        <div>
          {{ $t('loading.PLEASE_WAIT') }}
        </div>
        <v-progress-linear indeterminate class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
const loading = ref(false)
// import { mapGetters } from 'vuex'
//
// export default {
//   computed: {
//     ...mapGetters({
//       loading: 'share/isLoading',
//     }),
//   },
// }
</script>
