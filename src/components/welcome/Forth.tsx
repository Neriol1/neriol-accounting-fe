import { defineComponent, ref } from 'vue'
import cloud from '../../assets/icons/cloud.svg'
import s from './First.module.scss'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={cloud} />
        </div>
        <div class={s.actions}>
          <router-link class={s.fake} to=''></router-link>
          <router-link to='/start'>开始记账</router-link>
          <router-link class={s.fake} to='/start'></router-link>
        </div>
      </div>
    )
  },
})
