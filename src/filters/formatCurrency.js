import configs from "@/configs"

export function formatCurrency(value, currency) {
  const { currency: currencyConfig } = configs

  let c
  c = currency || currencyConfig.currency

  return formatPrice(value, c)
}

export function formatPrice(price, currency) {
  try {
    const numberFormatted = numberFormat(price, currency.decimalDigits, currency.decimalSeparator, currency.thousandsSeparator)

    if (currency.currencySymbol) {
      const priceSeparator = currency.currencySymbolNumberOfSpaces > 0 ? " ".repeat(currency.currencySymbolNumberOfSpaces) : ""
      let priceParts = [numberFormatted, priceSeparator, currency.currencySymbol]

      if (currency.currencySymbolPosition === "left") {
        priceParts = priceParts.reverse()
      }
      return priceParts.join("")
    } else {
      return numberFormatted
    }
  } catch (e) {
    return price
  }
}

export function numberFormat(number, decimals, dec_point, thousands_sep) {
  if (isNaN(number)) {
    return number
  }

  const negative = number < 0

  if (negative) number = number * -1

  const str = number
    .toFixed(decimals ? decimals : 0)
    .toString()
    .split(".")
  const parts = []

  for (let i = str[0].length; i > 0; i -= 3) {
    parts.unshift(str[0].substring(Math.max(0, i - 3), i))
  }

  str[0] = parts.join(thousands_sep ? thousands_sep : ",")

  return (negative ? "-" : "") + str.join(dec_point ? dec_point : ".")
}
