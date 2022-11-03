import { defineComponent, PropType, ref } from 'vue'
import { RouterView } from 'vue-router'
import s from './TagPage.module.scss'
export const TagPage = defineComponent({
  // props: {
  //   name: {
  //      type: String as PropType<'string'>,
  //      default: 'string',
  //   },
  // },
  setup: (props, context) => {
    return () => <RouterView></RouterView>
  },
})
