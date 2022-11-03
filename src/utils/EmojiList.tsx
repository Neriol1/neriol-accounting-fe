import { computed, defineComponent, PropType, ref } from 'vue'
import { emojiList } from './emojiList'
import s from './EmojiList.module.scss'
export const EmojiList = defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const refSelected = ref(0)
    const table: [string, string[]][] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['运动', ['sport', 'game']],
    ]
    const emojis = computed(() => {
      return table[refSelected.value][1].map((category) => {
        return emojiList
          .find((item) => item[0] === category)?.[1]
          ?.map((item) => (
            <li class={props.modelValue === item ? s.selectedEmoji : ''} onClick={() => onClickEmoji(item)}>
              {item}
            </li>
          ))
      })
    })
    const onClickTab = (index: number) => {
      refSelected.value = index
    }
    const onClickEmoji = (emoji: string) => {
      context.emit('update:modelValue', emoji)
    }
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((v, i) => (
            <span class={refSelected.value === i ? s.selected : ''} onClick={() => onClickTab(i)}>
              {v[0]}
            </span>
          ))}
        </nav>
        <ol>{emojis.value}</ol>
      </div>
    )
  },
})
