const _ = require('lodash')
const { trim } = require('lodash/string')
const { plural,camelToSnake,camelToDot,camelToKebab} = require('../util')

exports.entityFormContent = (model) => {
  const newModel = trim(model)
  const camelModel = _.camelCase(newModel)
  const pascalName = _.capitalize(camelModel)
  const pluralName = plural(camelModel)
  const kebabName = camelToKebab(camelModel)
  const dotName = camelToDot(camelModel)
  const snakeName = camelToSnake(camelModel)

  const content = `
<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5">{{ isNew ? $t('form.title.add') : $t('form.title.edit') }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="amount.value.value"
                type="number"
                variant="outlined"
                :error-messages="amount.errorMessage.value"
                :label="$t('form.label.amount')"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="integral.value.value"
                type="number"
                variant="outlined"
                :error-message="integral.errorMessage.value"
                :label="$t('form.label.integer')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider :thickness="2" />
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn variant="flat" color="secondary" size="large" @click="close">{{ $t('form.cancel') }}</v-btn>
        <v-spacer />
        <v-btn variant="flat" :disabled="!meta.valid" color="success" size="large" type="submit">{{ $t('form.save') }}</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { defineEmits, defineProps, reactive } from 'vue'
import { useField, useForm } from 'vee-validate'
import yup from '@/utils/validation'

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: true,
    default: () => {
      return {
        integral: 0,
        amount: 0,
      }
    },
  },
})
const emit = defineEmits(['save', 'close'])

const editedItem = reactive(props.item)

const validationSchema = yup.object({
  amount: yup.number().integer().required().min(1).label('金额'),
  integral: yup.number().integer().required().min(1).label('积分'),
})

const { handleSubmit, meta, submitCount } = useForm({
  validationSchema,
  initialValues: {
    amount: editedItem?.amount,
    integral: editedItem?.integral,
  },
  validateOnMount: true,
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
`
return content
}
