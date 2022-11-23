import { computed, defineComponent, PropType, ref } from 'vue'
import { EmojiList } from './EmojiList'
import { DatetimePicker, Popup } from 'vant'
import s from './Form.module.scss'
import { Time } from './time'
import { Button } from './Button'
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  },
})

export const FormItem = defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
    },
    label: {
      type: String as PropType<string>,
    },
    error: {
      type: String as PropType<string>,
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    placeholder: {
      type: String as PropType<string>,
    },
    options: {
      type: Array as PropType<Array<{ label: string, value: string }>>,
    },
    onClick:Function as PropType<()=>void>
  },
  emits:['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return (
            <input
              value={props.modelValue}
              placeholder={props.placeholder}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
              class={[s.formItem, s.input, !props.error ? '' : s.error]}></input>
          )
        case 'emojiSelect':
          return (
            <EmojiList
              modelValue={props.modelValue?.toString()}
              onUpdate:modelValue={(value) => context.emit('update:modelValue', value)}
              class={[s.formItem, s.emojiList, !props.error ? '' : s.error]}></EmojiList>
          )
        case 'validationCode':
          return (
            <>
              <input
                value={props.modelValue}
                class={[s.formItem, s.input, s.validationCodeInput]}
                placeholder={props.placeholder}
                onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
              />
              <Button onClick={props.onClick} class={[s.formItem, s.button, s.validationCodeButton]}>发送验证码</Button>
            </>
          )
        case 'date':
          return (
            <>
              <input
                readonly
                placeholder={props.placeholder}
                value={props.modelValue}
                onClick={() => { refDateVisible.value = true}}
                class={[s.formItem, s.input]}
              />
              <Popup v-model:show={refDateVisible.value} position='bottom'>
                <DatetimePicker
                  value={props.modelValue}
                  type='date'
                  title='选择年月日'
                  onConfirm={(date: Date) => {
                    context.emit('update:modelValue', new Time(date).format())
                    refDateVisible.value = false
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          )
        case 'select':
          return (
            <select
              class={[s.formItem, s.select]}
              value={props.modelValue}
              onChange={(e: any) => context.emit('update:modelValue', e.target.value)}>
              {props.options?.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          )
        default:
          return context.slots.default?.()
      }
    })

    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label && <span class={s.formItem_name}>{props.label}</span>}
          <div class={s.formItem_value}>{content.value}</div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    )
  },
})
