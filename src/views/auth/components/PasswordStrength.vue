<template>
  <div>
    <div :class="passwordStrengthClass">{{ passwordStrengthText }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  password: {
    type: String,
    required: true,
  },
})

const password = ref(props.password)

const passwordStrength = computed(() => {
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
  if (strongRegex.test(props.password)) {
    return "strong"
  } else if (mediumRegex.test(props.password)) {
    return "medium"
  } else {
    return "weak"
  }
})

const passwordStrengthText = computed(() => {
  switch (passwordStrength) {
    case "strong":
      return "Strong password"
    case "medium":
      return "Medium password"
    case "weak":
      return "Weak password"
    default:
      return ""
  }
})

const passwordStrengthClass = computed(() => {
  switch (passwordStrength) {
    case "strong":
      return "text-success"
    case "medium":
      return "text-warning"
    case "weak":
      return "text-primary"
    default:
      return ""
  }
})
</script>
