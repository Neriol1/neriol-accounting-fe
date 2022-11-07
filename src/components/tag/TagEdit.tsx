import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../utils/Button'
import { EmojiList } from '../../utils/EmojiList'
import { Icon } from '../../utils/Icon'
import s from './Tag.module.scss'
import '../../utils/validate'
import { Rules,validate } from '../../utils/validate'
import { TagForm } from './TagForm'
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const rules:Rules<typeof formData> = [
      { key: 'name', type: 'required', message: '请输入姓名' },
      { key: 'name', type: 'pattern', pattern: /^.{1,4}$/, message: '1-4位' },
      { key: 'sign', type: 'required', message: '请输入' },
    ]
    const errors = reactive<{[k in keyof typeof formData]?:string[]}>({})
    const onsubmit = (e:Event)=>{
      e.preventDefault()
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
    }
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <Icon name='left' onClick={() => {}}></Icon>,
            title: () => <span>新建标签</span>,
            default: () => (
              <>
                <TagForm></TagForm>
                <div class={s.actions}>
                  <Button level='danger' class={s.removeTags} onClick={() => { }}>删除标签</Button>
                  <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
                </div>
              </>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
