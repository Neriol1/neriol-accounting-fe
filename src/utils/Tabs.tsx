import { defineComponent, PropType, ref } from 'vue'
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
  props: {
    classPrefix:{
      type: String
    },
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>,
      required: false,
    },
  },
  setup: (props, context) => {
    return () => {
      const array = context.slots.default?.()
      if (!array) return null
      for (let i = 0; i < array.length; i++) {
        if (array[i].type !== Tab) {
          throw new Error('<Tabs> only accept <Tab> as children')
        }
      }
      const cp = props.classPrefix
      return (
        <div class={[s.tabs, cp + '_tabs']}>
          <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
            {array.map((v) => (
              <li
                class={[props.selected === v.props?.name ? [s.selected,cp+'_selected'] : '', cp + '_tabs_nav_item']}
                onClick={() => {
                  props?.onUpdateSelected?.(v.props?.name)
                  context.emit('update:selected', v.props?.name)
                }}>
                {v.props?.name}
              </li>
            ))}
          </ol>
          <div>{array.find((v) => v.props?.name === props.selected)}</div>
        </div>
      )
    }
  },
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>{context.slots.default?.()}</div>
  },
})
