import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { createPinia } from "pinia"
import useGlobal from "./GlobalStore"
import useConfig from "./ConfigStore"
import useMenu from "./MenuStore"
import useAuth from "./AuthStore"
import useBreadcrumb from "./BreadcrumbStore"
import useUser from "./UserStore"
import useAdminUser from "./AdminUserStore"
import useAboutUs from "./AboutUsStore"
import useAbout from "./AboutUsStore"
import useCarousel from "./CarouselStore"
import useTableHeader from "./TableHeaderStore"
import useProduct from "./ProductStore"
import useProductCategory from "./ProductCategoryStore"
import useOrder from "./OrderStore"
import useFeedback from "./FeedbackStore"
import useTopUpAmount from "./TopUpAmountStore"
import useTopUpRecord from "./TopUpRecordStore"
import useWithdraw from "./WithdrawStore"
import useRefund from "./RefundStore"
import useIntegralRecord from "./integralRecordStore"

export {
  useConfig,
  useGlobal,
  useMenu,
  useAuth,
  useBreadcrumb,
  useUser,
  useAdminUser,
  useAboutUs,
  useCarousel,
  useTableHeader,
  useProduct,
  useProductCategory,
  useOrder,
  useFeedback,
  useAbout,
  useRefund,
  useWithdraw,
  useTopUpAmount,
  useTopUpRecord,
  useIntegralRecord,
}
// export usePost()
/** Pinia Store */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia
