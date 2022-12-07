import { defineComponent, reactive, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const onClick = () => {}
    const refKind = ref('支出')
    const formData = reactive({
      tagId:0,
      kind:'',
      amount:0,
      happenAt:new Date().toISOString()
    })
    return () => (
      <MainLayout class={s.layout}>
        {{
          icon: () => <Icon name='left' class={s.iconNav} onClick={onClick} />,
          title: () => '记一笔',
          default: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name='支出' >
                  {formData.amount}
                  <Tags kind='expenses' v-model:selected={formData.tagId}></Tags>
                </Tab>
                <Tab name='收入'>
                  <Tags kind='income'  v-model:selected={formData.tagId}></Tags>
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad 
                  v-model:amount={formData.amount}
                  v-model:happenAt={formData.happenAt} />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
