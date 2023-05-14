/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import defaults from "./defaults"
import { icons } from "./icons"
import theme from "./theme"
import { createVuetify } from "vuetify"
// Translations provided by Vuetify
import { en, zhHans } from "vuetify/locale"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults,
  icons,
  theme,
  locale: {
    locale: "zhHans",
    fallback: "zhHans",
    messages: { zhHans, en },
  },
})
