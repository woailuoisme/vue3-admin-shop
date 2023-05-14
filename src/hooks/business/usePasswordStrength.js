export default function usePasswordStrength(pwd) {
  const password = ref(pwd)
  const passwordStrength = computed(() => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
    if (strongRegex.test(password.value)) {
      return "strong"
    } else if (mediumRegex.test(password.value)) {
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

  return { passwordStrength, passwordStrengthText, passwordStrengthClass }
}
