<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5">{{ isNew ? $t('form.title.add') : $t('form.title.edit') }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                type="number"
                variant="outlined"
                v-model="amount.value.value"
                :error-messages="amount.errorMessage.value"
                :label="$t('form.label.amount')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                type="number"
                variant="outlined"
                v-model="integral.value.value"
                :error-message="integral.errorMessage.value"
                label="$t('form.label.integer')"
              />
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-divider :thickness="2"></v-divider>
      <v-card-actions class="py-4">
        <v-spacer/>
        <v-btn variant="flat" color="secondary" size="large" @click="close">取消</v-btn>
        <v-spacer/>
        <v-btn variant="flat" :disabled="!meta.valid" color="success" size="large" type="submit">保存</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script setup>
import {defineEmits, defineProps, reactive} from 'vue'
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {cnLocale} from '@/utils/yup'

yup.setLocale(cnLocale)

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: true,
    default: {
      integral: 0,
      amount: 0,
    },
  },
})
const editedItem = reactive(props.item)

const emit = defineEmits(['save', 'close'])

const validationSchema = yup.object({
  integral: yup.number().integer().required().min(1).label('积分'),
  amount: yup.number().integer().required().min(1).label('金额'),
})

const {handleSubmit, meta, submitCount} = useForm({
  validationSchema, initialValues: {
    integral: editedItem?.integral,
    amount: editedItem?.amount,
  },
  validateOnMount: true
})

const amount = useField('amount')
const integral = useField('integral')

const submit = handleSubmit((values) => {
  emit('save', values)
})

function close() {
  emit('close')
}
</script>
<style scoped></style>
