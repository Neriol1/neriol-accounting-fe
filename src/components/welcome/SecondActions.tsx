import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
export const SecondActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <router-link class={s.fake} to=''>
      跳过
    </router-link>
    <router-link to='/welcome/3'>下一页</router-link>
    <router-link to='/start'>跳过</router-link>
  </div>
)

SecondActions.displayName = 'SecondActions'
