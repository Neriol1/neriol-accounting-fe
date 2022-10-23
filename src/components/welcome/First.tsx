import { defineComponent, ref } from 'vue'
import piggy_bank from '../../assets/icons/piggy_bank.svg'
import s from './First.module.scss'
export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={piggy_bank} />
          <h2>
            会挣钱
            <br />
            还要会省钱
          </h2>
        </div>
        <div class={s.actions}>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/2'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </div>
      </div>
    )
  },
})
