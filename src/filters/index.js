import { saleLabel, saleColor, orderStatusLabel, orderShowExpress, isActivityLabel, isActivityColor } from "@/filters/formatLabel"

export * from "./formatCurrency"
export * from "./formatLabel"
import { formatCurrency } from "@/filters/formatCurrency"

export function registerFilters(app) {
  app.config.globalProperties.$filter = {
    orderStatusLabel,
    orderShowExpress,
    isActivityLabel,
    isActivityColor,
    saleLabel,
    saleColor,
    formatCurrency,
  }
}
