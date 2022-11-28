import { ref } from "vue"

export const useBool = (initialValue: boolean) => {
  const value = ref(initialValue)
  return {
    ref:value,
    toggle: () => value.value = !value.value,
    on: () => value.value = true,
    off: () => value.value = false,
  }
}