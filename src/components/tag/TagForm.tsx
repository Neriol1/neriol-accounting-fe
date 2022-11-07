import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../utils/Button'
import { EmojiList } from '../../utils/EmojiList'
import { Icon } from '../../utils/Icon'
import s from './Tag.module.scss'
import '../../utils/validate'
import { Rules,validate } from '../../utils/validate'
export const TagForm = defineComponent({
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
      <form class={s.form} onSubmit={onsubmit}>
      <div class={s.formRow}>
        <label class={s.formLabel}>
          <span class={s.formItem_name}>标签名</span>
          <div class={s.formItem_value}>
            <input v-model={formData.name} class={[s.formItem, s.input, errors['name'] ? s.error : '']}></input>
          </div>
          <div class={s.formItem_errorHint}>
            <span>{errors['name'] ? errors['name']?.[0] :  '　'}</span>
          </div>
        </label>
      </div>

      <div class={s.formRow}>
        <label class={s.formLabel}>
          <span class={s.formItem_name}>符号 {formData.sign}</span>
          <div class={s.formItem_value}>
            <EmojiList v-model={formData.sign} class={[s.formItem, s.emojiList, errors['sign'] ? s.error : '']}></EmojiList>
          </div>
          <div class={s.formItem_errorHint}>
            <span>{errors['sign'] ? errors['sign']?.[0] :  '　'}</span>
          </div>
        </label>
      </div>

      <p class={s.tips}>记账时长按标签即可进行编辑</p>
      <div class={s.formRow}>
        <div class={s.formItem_value}>
          <Button class={[s.formItem, s.button]}>确定</Button>
        </div>
      </div>
    </form>
    )
  },
})
