import { useIntervalFn } from "@vueuse/core"
import { ref } from "vue"

export function useCountDown() {
  const counter = ref(0)
  const isFinished = ref(false)
  const { pause, resume } = useIntervalFn(
    () => {
      if (counter.value === 0) {
        isFinished.value = true
        pause()
      } else {
        counter.value--
      }
    },
    1000,
    { immediate: false },
  )

  const start = (num) => {
    isFinished.value = false
    counter.value = num
    resume()
  }

  return { counter, start, isFinished }
}
