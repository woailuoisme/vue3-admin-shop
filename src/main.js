/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// import {createApp} from 'vue'
import {createApp} from 'vue/dist/vue.esm-bundler'
// data table scss style
import '@/styles/style.css'

// Plugins
import {registerPlugins} from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

if (import.meta.env.MODE === 'dev') {

  console.log(' import.meta.env.MODE: ', import.meta.env.MODE);
  console.log(' import.meta.env.BASE_URL: ', import.meta.env.BASE_URL);
  console.log(' import.meta.env.PROD: ', import.meta.env.PROD);
  console.log(' import.meta.env.DEV: ', import.meta.env.DEV);
  console.log(' import.meta.env.SSR: ', import.meta.env.SSR);
  // console.log(app.$vuetify.display);
  console.log(app.version);
  console.log(import.meta.env.VITE_BASE_URL)
  console.log(import.meta.env.VITE_BASE_URL_ADMIN)
}

export default app;
