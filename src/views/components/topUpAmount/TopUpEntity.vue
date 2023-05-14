<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-card-title class="text-center">
        <span class="text-h5 text-primary">{{ isNew ? $t("form.title.add") : $t("form.title.edit") }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="amount.value.value"
                v-mask="'##########'"
                :error-messages="amount.errorMessage.value"
                :label="$t('form.label.amount')"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="integral.value.value"
                v-mask="'##########'"
                :error-messages="integral.errorMessage.value"
                :label="$t('form.label.integer')"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider :thickness="2" />
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn color="info" size="large" variant="outlined" @click="close">{{ $t("form.cancel") }}</v-btn>
        <v-spacer />
        <v-btn :disabled="!meta.valid" color="primary" size="large" type="submit" variant="elevated">{{ $t("form.save") }}</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { useField, useForm } from "vee-validate"
import yup from "@/utils/validation"

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true,
    default: false,
  },
  item: {
    type: Object,
    required: true,
    default() {
      return {
        amount: 1,
        integral: 1,
      }
    },
  },
})
const emit = defineEmits(["save", "close"])

const validationSchema = yup.object({
  amount: yup.number().integer().required().min(1).label("金额"),
  integral: yup.number().integer().required().min(1).label("积分"),
})

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    amount: props.item?.amount ?? 1,
    integral: props.item?.integral ?? 1,
  },
  validateOnMount: true,
})

const amount = useField("amount")
const integral = useField("integral")

const submit = handleSubmit((values) => {
  emit("save", values)
})

function close() {
  emit("close")
}
</script>

<style scoped></style>
