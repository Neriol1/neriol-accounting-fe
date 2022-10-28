import { defineComponent, PropType, ref } from 'vue'
import s from './Icon.module.scss'
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<'chart' | 'clock' | 'cloud' | 'mangosteen' | 'piggy_bank' | 'add'>,
      default: 'string',
    },
  },
  setup: (props, context) => {
    return () => (
      <>
        <svg class={s.icon}>
          <use xlinkHref={`#${props.name}`} />
        </svg>
      </>
    )
  },
})
