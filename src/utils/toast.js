import {useToast} from "vue-toastification";

const options = {
  position: "top-right",
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
}
// Get toast interface
const toast = useToast();

class Toast {
  static show(msg) {
    toast(msg, options)
  }

  static info(msg) {
    toast.info(msg, options)
  }

  static success(msg) {
    toast.success(msg, options)
  }

  static warning(msg) {
    toast.warning(msg, options)
  }

  static error(msg) {
    toast.error(msg, options)
  }
}

export default Toast
