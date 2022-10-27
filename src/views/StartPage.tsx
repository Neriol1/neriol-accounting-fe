import { defineComponent, ref } from 'vue'
import { Button } from '../utils/Button'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log(1)
    }
    return () => (
      <>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            开始记账
          </Button>
        </div>
      </>
    )
  },
})
