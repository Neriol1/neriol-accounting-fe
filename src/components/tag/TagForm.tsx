import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../utils/Button'
import { EmojiList } from '../../utils/EmojiList'
import { Icon } from '../../utils/Icon'
import s from './Tag.module.scss'
import '../../utils/validate'
import { Rules, validate } from '../../utils/validate'
import { Form, FormItem } from '../../utils/Form'
export const TagForm = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const rules: Rules<typeof formData> = [
      { key: 'name', type: 'required', message: '必填' },
      { key: 'sign', type: 'required', message: '必填' },
      { key: 'name', type: 'pattern', pattern: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
    ]
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onsubmit = (e: Event) => {
      Object.assign(errors, {
        name: undefined,
        sign: undefined,
      })
      Object.assign(errors, validate(formData, rules))
      console.log(errors, '--')
      e.preventDefault()
    }
    return () => (
      <Form onSubmit={onsubmit}>
        <FormItem
          type='text'
          v-model={formData.name}
          label='标签名'
          error={ errors['name']?.[0]}></FormItem>
        <FormItem
          type='emojiSelect'
          v-model={formData.sign}
          label={'符号' + formData.sign}
          error={errors['sign']?.[0]}></FormItem>
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    )
  },
})
