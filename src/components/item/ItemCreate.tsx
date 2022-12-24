import { AxiosError } from 'axios'
import { Dialog } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
export const ItemCreate = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const formData = reactive({
      tagId:0,
      kind:'支出',
      amount:0,
      happenAt:new Date().toISOString()
    })
    const onError = (error:AxiosError<ResourceError>)=>{
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        })
      }
      throw error
    }
    const onSubmit = async () => {
      await http.post<Resource<Item>>('/items', formData, {
          params: { _mock: 'itemCreate' },
        })
        .catch(onError)
      router.push('/items')
    }
    return () => (
      <MainLayout class={s.layout}>
        {{
          icon: () => <BackIcon class={s.iconNav} />,
          title: () => '记一笔',
          default: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab name='支出' >
                  <Tags kind='expenses' v-model:selected={formData.tagId}></Tags>
                </Tab>
                <Tab name='收入'>
                  <Tags kind='income'  v-model:selected={formData.tagId}></Tags>
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad 
                  v-model:amount={formData.amount}
                  v-model:happenAt={formData.happenAt}
                  onSubmit={onSubmit} />
              </div>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
