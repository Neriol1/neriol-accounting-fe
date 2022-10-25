import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
export const ThirdActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <router-link class={s.fake} to=''>
      跳过
    </router-link>
    <router-link to='/welcome/4'>下一页</router-link>
    <router-link to='/start'>跳过</router-link>
  </div>
)

ThirdActions.displayName = 'ThirdActions'
