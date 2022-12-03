import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { SkipFeatures } from '../../shared/skipFeatures'
export const ThirdActions: FunctionalComponent = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <router-link to='/welcome/4'>下一页</router-link>
    <SkipFeatures  />
  </div>
)

ThirdActions.displayName = 'ThirdActions'
