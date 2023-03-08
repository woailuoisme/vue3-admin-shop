import { Icon } from '@iconify/vue'
import { aliases } from 'vuetify/lib/iconsets/mdi'
import { h } from 'vue'
export const iconify = {
  component: props => h(Icon, props),
}
export const icons = {
  defaultSet: 'iconify',
  aliases,
  sets: {
    iconify,
  },
}
