import { defineComponent, ref } from 'vue'
import { Button } from '../utils/Button'
import { Center } from '../utils/Center'
import { FloatButton } from '../utils/FloatButton'
import { Icon } from '../utils/Icon'
import { Navbar } from '../utils/Navbar'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log(1)
    }
    return () => (
      <>
        <Navbar>
          {{
            icon: () => <Icon name='menu' class={s.iconNav} />,
            default: '山竹记账',
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name='pig' class={s.pig}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>
            开始记账
          </Button>
        </div>
        <FloatButton iconName='add'></FloatButton>
      </>
    )
  },
})
