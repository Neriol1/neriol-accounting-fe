import { defineComponent, ref } from 'vue'
import chart from '../../assets/icons/chart.svg'
import s from './First.module.scss'
export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={chart} />
          <h2>
            数据可视化
            <br />
            收支一目了然
          </h2>
        </div>
        <div class={s.actions}>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/4'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </div>
      </div>
    )
  },
})
