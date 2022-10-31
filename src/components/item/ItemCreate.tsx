import { defineComponent, PropType, ref } from 'vue'
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
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
