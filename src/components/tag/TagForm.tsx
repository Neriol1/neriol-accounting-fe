import { defineComponent, reactive } from 'vue'
import { Button } from '../../shared/Button'
import s from './Tag.module.scss'
import '../../shared/validate'
import { hasErrors, Rules, validate } from '../../shared/validate'
import { Form, FormItem } from '../../shared/Form'
import { useRoute, useRouter } from 'vue-router'
import { http } from '../../shared/Http'
import { onFormError } from '../../shared/onFormError'
export const TagForm = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive({
      name: '',
      sign: '',
      kind: route.query.kind!.toString(),
    })
    const rules: Rules<typeof formData> = [
      { key: 'name', type: 'required', message: '必填' },
      { key: 'sign', type: 'required', message: '必填' },
      { key: 'name', type: 'pattern', pattern: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
    ]
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onsubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        name: [],
        sign: [],
      })
      Object.assign(errors, validate(formData, rules))
      if(!hasErrors(errors)){
        const response = await http.post('/tags', formData, {
          params: { _mock: 'tagCreate' },
        }).catch((error)=>{
          onFormError(error, (data) => Object.assign(errors, data.errors))
        })
        router.back()
      }
    }
    return () => (
      <Form onSubmit={onsubmit}>
        <FormItem
          type='text'
          v-model={formData.name}
          label='标签名(最多4个字符)'
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
          <Button type='submit' class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    )
  },
})
