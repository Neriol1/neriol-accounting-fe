import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../utils/Button'
import { Center } from '../utils/Center'
import { FloatButton } from '../utils/FloatButton'
import { Icon } from '../utils/Icon'
import { Navbar } from '../utils/Navbar'
import { Overlay, OverlayIcon } from '../utils/Overlay'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  setup: (props, context) => {
    
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <OverlayIcon />,
            title: () => '山竹记账',
            default: () => (
              <>
                <Center class={s.pig_wrapper}>
                  <Icon name='pig' class={s.pig}></Icon>
                </Center>
                <div class={s.button_wrapper}>
                  <RouterLink to='/items/create'>
                    <Button class={s.button}>
                      开始记账
                    </Button>
                  </RouterLink>
                </div>
                <RouterLink to='/items/create'>
                  <FloatButton iconName='add'></FloatButton>
                </RouterLink>
              </>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
