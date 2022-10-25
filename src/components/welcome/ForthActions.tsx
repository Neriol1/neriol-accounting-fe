import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
export const ForthActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <router-link class={s.fake} to=''></router-link>
    <router-link to='/start'>开始记账</router-link>
    <router-link class={s.fake} to='/start'></router-link>
  </div>
)

ForthActions.displayName = 'ForthActions'
