import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

/** Pinia Store */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
// Pinia Stores

import useGlobal from './GlobalStore'
import useConfig from './ConfigStore'
import useMenu from './MenuStore'
import useAuth from './AuthStore'
import useBreadcrumb from './BreadcrumbStore'

export { useConfig, useGlobal, useMenu, useAuth, useBreadcrumb }
