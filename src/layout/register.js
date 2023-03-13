/**
 * Register layouts in the app instance
 *
 */
import AuthLayout from './AuthLayout'
import DefaultLayout from './DefaultLayout'
import MenuLayout from './MenuLayout'

export function registerLayouts(app) {
  app.component('AuthLayout', AuthLayout)
  app.component('DefaultLayout', DefaultLayout)
  app.component('MenuLayout', MenuLayout)
}
