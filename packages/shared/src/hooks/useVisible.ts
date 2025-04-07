import { ref } from 'vue'

export const useVisible = (bool = false) => {
  const visible = ref(bool)

  const show = () => {
    visible.value = true
  }
  const hide = () => {
    visible.value = false
  }
  const toggle = () => {
    visible.value = !visible.value
  }

  return {
    visible,
    show,
    hide,
    toggle,
  }
}
