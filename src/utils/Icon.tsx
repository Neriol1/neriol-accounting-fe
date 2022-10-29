import { defineComponent, PropType, ref } from 'vue'
import s from './Icon.module.scss'

export type IconName = 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'piggy_bank' | 'add'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
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
