import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { SkipFeatures } from '../../shared/skipFeatures'
export const ForthActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <router-link to='/start'>开始记账</router-link>
    <SkipFeatures class={s.fake} />
  </div>
)

ForthActions.displayName = 'ForthActions'
