import { defineComponent, ref } from 'vue'
import clock from '../../assets/icons/clock.svg'
import s from './First.module.scss'
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={clock} />
          <h2>
            每日提醒
            <br />
            不会遗漏每一笔账单
          </h2>
        </div>
        <div class={s.actions}>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/3'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </div>
      </div>
    )
  },
})
