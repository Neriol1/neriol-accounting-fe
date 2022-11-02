import { defineComponent, PropType, ref } from 'vue'
import s from './Icon.module.scss'

export type IconName =
  | 'chart'
  | 'clock'
  | 'cloud'
  | 'mangosteen'
  | 'pig'
  | 'add'
  | 'menu'
  | 'menuChart'
  | 'notify'
  | 'export'
  | 'left'
  | 'date'

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={`#${props.name}`} />
      </svg>
    )
  },
})
