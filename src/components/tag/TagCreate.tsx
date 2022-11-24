import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { EmojiList } from '../../shared/EmojiList'
import { Icon } from '../../shared/Icon'
import s from './Tag.module.scss'
import '../../shared/validate'
import { Rules,validate } from '../../shared/validate'
import { TagForm } from './TagForm'
export const TagCreate = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const rules:Rules<typeof formData> = [
      { key: 'name', type: 'required', message: '请输入姓名' },
      { key: 'sign', type: 'required', message: '请输入' },
      { key: 'sign', type: 'pattern', pattern: /^\.{4,5}$/, message: '4-5位' },
    ]
    const errors = reactive<{[k in keyof typeof formData]?:string[]}>({})
    const onsubmit = (e:Event)=>{
      e.preventDefault()
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      console.log(errors,'--');
    }
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <Icon name='left' onClick={() => {}}></Icon>,
            title: () => <span>新建标签</span>,
            default: () => (
             <TagForm></TagForm>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
