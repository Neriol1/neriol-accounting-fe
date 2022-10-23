import { defineComponent, ref } from 'vue'
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <img src={logo} alt='logo' />
          <h1>Neriol</h1>
        </header>
        <main class={s.main}>
          <router-view></router-view>
        </main>
      </div>
    )
  },
})
