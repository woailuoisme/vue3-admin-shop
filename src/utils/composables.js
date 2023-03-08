import { customRef, ref } from 'vue'
import { debounce, throttle } from '@/utils/util'

// const debounce = (fn, delay = 0, immediate = false) => {
//   let timeout
//   return (...args) => {
//     if (immediate && !timeout) fn(...args)
//     clearTimeout(timeout)
//
//     timeout = setTimeout(() => {
//       fn(...args)
//     }, delay)
//   }
// }

export const useDebouncedRef = (initialValue, wait) => {
  const state = ref(initialValue)
  return customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce(value => {
      state.value = value
      trigger()
    }, wait),
  }))
}

export const useThrottleRef = (initialValue, wait) => {
  const state = ref(initialValue)
  return customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: throttle(value => {
      state.value = value
      trigger()
    }, wait),
  }))
}

export default { useDebouncedRef, useThrottleRef }
