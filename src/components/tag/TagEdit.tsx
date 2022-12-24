import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { EmojiList } from '../../shared/EmojiList'
import { Icon } from '../../shared/Icon'
import s from './Tag.module.scss'
import '../../shared/validate'
import { Rules,validate } from '../../shared/validate'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
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
            icon: () => <BackIcon />,
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
