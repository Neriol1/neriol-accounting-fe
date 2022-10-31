import { defineComponent, PropType, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../utils/Icon'
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<'string'>,
      default: 'string',
    },
  },
  setup: (props, context) => {
    const onClick = () => {}
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <Icon name='left' class={s.iconNav} onClick={onClick} />,
            title: () => '记一笔',
            default: () => '111',
          }}
        </MainLayout>
      </>
    )
  },
})
