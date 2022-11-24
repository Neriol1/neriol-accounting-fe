import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import s from './Welcome.module.scss'
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import { useSwipe } from '../hooks/useSwipe'
import { throttle } from '../shared/throttle'
const routesMap: Record<string, string> = {
  welcome1: '/welcome/2',
  welcome2: '/welcome/3',
  welcome3: '/welcome/4',
  welcome4: '/start',
}

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null)
    const { direction, swiping } = useSwipe(main, {
      beforeStart: e => e?.preventDefault(),
    })
    const router = useRouter()
    const route = useRoute()
    const replace = throttle(() => {
      const name = (route.name || 'welcome1').toString()
      router.replace(routesMap[name])
    }, 500)
    watchEffect(() => {
      if (swiping.value && direction.value == 'left') {
        replace()
      }
    })
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref='#mangosteen'></use>
          </svg>
          <h1>Neriol</h1>
        </header>
        <main class={s.main} ref={main}>
          <router-view name='main'>
            {({ Component: X, route: R }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {X}
              </Transition>
            )}
          </router-view>
        </main>
        <footer>
          <router-view name='footer'></router-view>
        </footer>
      </div>
    )
  },
})
