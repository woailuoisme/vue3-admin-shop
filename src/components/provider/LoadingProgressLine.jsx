import { defineComponent, ref, provide, inject } from "vue"
import { VProgressLinear } from "vuetify/components"

export const LoadingProgressLineInjectKey = "LoadingProgressLineInjectKey "
export default defineComponent({
  name: "loadingProgressProvider",
  setup() {
    const model = ref(false)
    const api = {
      show: () => {
        model.value = true
      },
      hide: () => {
        model.value = false
      },
    }
    const theme = useThemeStore()
    provide(LoadingProgressLineInjectKey, api)
    return { model, theme }
  },
  render() {
    return (
      <>
        {this.$slots.default?.()}
        <VProgressLinear
          active={this.model}
          indeterminate={true}
          absolute={true}
          class={[this.theme.isToolbarDetached ? "mt-3" : null, "position-fixed"]}
          style="top: var(--v-layout-top);z-index: 1000"
          color="primary-lighten-1"
        ></VProgressLinear>
      </>
    )
  },
})

export function useLoadingProgressLine() {
  const api = inject(LoadingProgressLineInjectKey, null)
  if (api === null) {
    throw new Error("not outer <loading-progress-provider> found")
  }
  return api
}
