import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../utils/Button'
import { Center } from '../utils/Center'
import { FloatButton } from '../utils/FloatButton'
import { Icon } from '../utils/Icon'
import { Navbar } from '../utils/Navbar'
import { Overlay } from '../utils/Overlay'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClick = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <Icon name='menu' class={s.iconNav} onClick={onClick} />,
            title: () => '山竹记账',
            default: () => (
              <>
                <Center class={s.pig_wrapper}>
                  <Icon name='pig' class={s.pig}></Icon>
                </Center>
                <div class={s.button_wrapper}>
                  <RouterLink to='/items/create'>
                    <Button class={s.button} onClick={onClick}>
                      开始记账
                    </Button>
                  </RouterLink>
                </div>
                <RouterLink to='/items/create'>
                  <FloatButton iconName='add'></FloatButton>
                </RouterLink>
                {refOverlayVisible.value && <Overlay onClose={() => (refOverlayVisible.value = false)} />}
              </>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
