import { defineComponent, PropType, ref } from 'vue'
import s from './ItemList.module.scss'
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<'string'>,
      default: 'string',
    },
  },
  setup: (props, context) => {
    return () => (
      <>
        <div>1</div>
      </>
    )
  },
})
