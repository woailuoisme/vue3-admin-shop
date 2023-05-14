import Toast from "vue-toastification"
// Import the CSS or use your own!
import "vue-toastification/dist/index.css"

export const toastOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
}

export default { Toast, toastOptions }
