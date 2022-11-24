import { defineComponent, PropType, ref } from 'vue'
import s from './Center.module.scss'
const directionMap = {
  '|': 'vertical',
  '-': 'horizontal',
  horizontal: 'horizontal',
  vertical: 'vertical',
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'|' | '-' | 'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction]
    return () => <div class={[s.center, extraClass]}>{context.slots.default?.()}</div>
  },
})
