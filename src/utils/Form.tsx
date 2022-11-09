import { computed, defineComponent, PropType, ref } from 'vue'
import { EmojiList } from './EmojiList'
import s from './Form.module.scss'
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
      type: String as PropType<'text' | 'emojiSelect' | 'date'>,
    },
  },
  setup: (props, context) => {
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return (
            <input
              value={props.modelValue}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
              class={[s.formItem, s.input, props.error === '　' || !props.error ? '' : s.error]}></input>
          )
        case 'emojiSelect':
          return (
            <EmojiList
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) => context.emit('update:modelValue', value)}
              class={[s.formItem, s.emojiList, props.error === '　' || !!props.error ? '' : s.error]}></EmojiList>
          )
        case 'date':
          return <input></input>
        default:
          return context.slots.default?.()
      }
    })

    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label && <span class={s.formItem_name}>{props.label}</span>}
          <div class={s.formItem_value}>{content.value}</div>
          {props.error && (
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div>
          )}
        </label>
      </div>
    )
  },
})
