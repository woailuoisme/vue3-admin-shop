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

export const useToastMsg = () => {
  function showMsg(msg) {
    toast(msg, options)
  }

  function infoMsg(msg) {
    toast.info(msg, options)
  }

  function successMsg(msg) {
    toast.success(msg, options)
  }

  function warningMsg(msg) {
    toast.warning(msg, options)
  }

  function errorMsg(msg) {
    toast.error(msg, options)
  }
  return { showMsg, infoMsg, successMsg, warningMsg, errorMsg }
}

export default Toast
