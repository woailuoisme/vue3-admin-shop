import { useToast } from "vue-toastification"
// Get toast interface
const toast = useToast()
export const useToastMsg = () => {
  function infoMsg(msg) {
    toast.info(msg)
  }

  function successMsg(msg) {
    toast.success(msg)
  }

  function warnMsg(msg) {
    toast.warning(msg)
  }

  function errorMsg(msg) {
    toast.error(msg)
  }

  return { infoMsg, successMsg, warnMsg, errorMsg }
}
