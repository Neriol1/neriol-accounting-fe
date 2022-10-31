import { defineComponent, PropType, ref } from 'vue'
import s from './ItemPage.module.scss'
export const ItemPage = defineComponent({
  props: {
    name: {
      type: String as PropType<'string'>,
      default: 'string',
    },
  },
  setup: (props, context) => {
    return () => (
      <>
        <div>hi</div>
      </>
    )
  },
})
