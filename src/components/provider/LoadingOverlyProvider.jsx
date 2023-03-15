import { defineComponent, ref, inject, provide } from "vue"
import { VOverlay, VProgressCircular } from "vuetify/components"

export const LoadingOverlyInjectKey = "LoadingOverly"

export default defineComponent({
  name: "loadingOverlyProvider",
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
    provide(LoadingOverlyInjectKey, api)
    return { model }
  },
  render() {
    return (
      <>
        {this.$slots.default?.()}
        <VOverlay v-model={this.model} class={["align-center", "justify-center"]}>
          <VProgressCircular color="primary" indeterminate size="64"></VProgressCircular>
        </VOverlay>
      </>
    )
  },
})

export function useLoadingOverly() {
  const api = inject(LoadingOverlyInjectKey, null)
  if (api === null) {
    throw new Error("not outer <loading-overly-provider> found")
  }
  return api
}
