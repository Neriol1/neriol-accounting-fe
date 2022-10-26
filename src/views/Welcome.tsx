import { defineComponent, ref, Transition, VNode } from 'vue'
import s from './Welcome.module.scss'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref='#mangosteen'></use>
          </svg>
          <h1>Neriol</h1>
        </header>
        <main class={s.main}>
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
