import en from "../locales/en.yml"
import cn from "../locales/cn.yml"

const supported = ["en", "cn"]
let locale = "en"

try {
  const { 0: browserLang } = navigator.language.split("-")
  if (supported.includes(browserLang)) locale = browserLang
} catch (e) {
  console.log(e)
}

export default {
  locale,
  fallbackLocale: "en",
  availableLocales: [
    {
      code: "en",
      flag: "us",
      label: "English",
      messages: en,
    },
    {
      code: "cn",
      flag: "cn",
      label: "中文",
      messages: cn,
    },
  ],
}
