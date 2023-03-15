import { useToast } from "vue-toastification"

const options = {
  position: "top-right",
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
}

const infoOptions = {
  position: "top-center",
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
}

// Get toast interface
const toast = useToast()

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

export const userToast = () => {
  function show(msg) {
    toast(msg, options)
  }

  function info(msg) {
    toast.info(msg, options)
  }

  function success(msg) {
    toast.success(msg, options)
  }

  function warning(msg) {
    toast.warning(msg, options)
  }

  function error(msg) {
    toast.error(msg, options)
  }
  return { show, info, success, warning, error }
}

export default Toast
