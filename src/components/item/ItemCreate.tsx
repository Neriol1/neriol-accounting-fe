import { defineComponent, PropType, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../utils/Icon'
import { Tab, Tabs } from '../../utils/Tabs'
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
    const refKind = ref('支出')
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <Icon name='left' class={s.iconNav} onClick={onClick} />,
            title: () => '记一笔',
            default: () => (
              <>
                {/* <Tabs selected={refKind.value} onUpdateSelected={name => (refKind.value = name)}> */}
                <Tabs v-model:selected={refKind.value}>
                  <Tab name='支出'>111</Tab>
                  <Tab name='收入'>111</Tab>
                </Tabs>
              </>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
