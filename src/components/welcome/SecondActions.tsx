import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { SkipFeatures } from '../../shared/skipFeatures'
export const SecondActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <router-link to='/welcome/3'>下一页</router-link>
    <SkipFeatures  />
  </div>
)

SecondActions.displayName = 'SecondActions'
