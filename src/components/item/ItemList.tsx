import { defineComponent, PropType, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../utils/Icon'
import { Tab, Tabs } from '../../utils/Tabs'
import s from './ItemList.module.scss'
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<'string'>,
      default: 'string',
    },
  },
  setup: (props, context) => {
    const refSelected = ref('本月')
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <Icon name='menu' />,
          default: () => (
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
              <Tab name='本月'>1</Tab>
              <Tab name='上月'>2</Tab>
              <Tab name='今年'>2</Tab>
              <Tab name='自定义时间'>2</Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    )
  },
})
