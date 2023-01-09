import { defineComponent, PropType, ref, watch } from 'vue'
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
    renderOnSelect:{
      type: Boolean,
      default: false
    }
  },
  emits:['update:selected'],
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) return null
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].type !== Tab) {
          throw new Error('<Tabs> only accept <Tab> as children')
        }
      }
      const cp = props.classPrefix
      return (
        <div class={[s.tabs, cp + '_tabs']}>
          <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
            {tabs.map((v) => (
              <li
                class={[props.selected === v.props?.name ? [s.selected, cp + '_selected'] : '', cp + '_tabs_nav_item']}
                onClick={() => {
                  context.emit('update:selected', v.props?.name)
                }}>
                {v.props?.name}
              </li>
            ))}
          </ol>
          <div>
            {props.renderOnSelect ? (
              <div>{tabs.find((v) => v.props?.name === props.selected)}</div>
            ) : (
              tabs.map((v) => <div v-show={v.props?.name === props.selected}>{v}</div>)
            )}
          </div>
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
