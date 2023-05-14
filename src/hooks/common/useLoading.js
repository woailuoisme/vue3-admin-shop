import useBoolean from "./useBoolean"

export default function useLoading(initValue = false) {
  const { bool: loading, setTrue: start, setFalse: end } = useBoolean(initValue)

  return {
    loading,
    start,
    end,
  }
}
