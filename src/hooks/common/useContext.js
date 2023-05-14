import { inject, provide } from "vue"

export default function useContext(contextName = "context") {
  const injectKey = Symbol(contextName)

  function useProvide(context) {
    provide(injectKey, context)
    return context
  }

  function useInject() {
    return inject(injectKey)
  }

  return {
    useProvide,
    useInject,
  }
}
