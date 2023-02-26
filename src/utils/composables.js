import {customRef, ref} from 'vue'

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
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  }
}

function throttle(fn, wait) {
  let throttled = false;
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, wait);
    }
  }
}

export const useDebouncedRef = (initialValue, wait) => {
  const state = ref(initialValue)
  return customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce(
      value => {
        state.value = value
        trigger()
      },
      wait
    ),
  }))
}


export const useThrottleRef = (initialValue, wait) => {
  const state = ref(initialValue)
  return customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: throttle(
      value => {
        state.value = value
        trigger()
      },
      wait
    ),
  }))
}

export default {useDebouncedRef, useThrottleRef}
