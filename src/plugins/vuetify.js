/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import defaults from './vuetify/defaults'
import { icons } from './vuetify/icons'
import theme from './vuetify/theme'

// Composables
import { createVuetify } from 'vuetify'

const customLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
//https://vuetifyjs.com/en/styles/colors/
const customDarkTheme = {
  dark: true,
  colors: {
    background: '#15202b',
    surface: '#15202b',
    primary: '#3f51b5',
    secondary: '#03dac6',
    error: '#f44336',
    info: '#2196F3',
    success: '#4caf50',
    warning: '#fb8c00',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults,
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   },
  // },
  icons,
  theme,
  // theme: {
  //   defaultTheme: 'light',
  //   themes: {
  //     customLightTheme,
  //     customDarkTheme,
  //     light: {
  //       colors: {
  //         primary: '#1867C0',
  //         secondary: '#42A5F5',
  //       },
  //     },
  //   },
  // },
})
