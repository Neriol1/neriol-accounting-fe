import piggy_bank from '../../assets/icons/piggy_bank.svg'
import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
export const First: FunctionalComponent = () => (
  <div class={s.card}>
    <img src={piggy_bank} />
    <h2>
      会挣钱
      <br />
      还要会省钱
    </h2>
  </div>
)

First.displayName = 'First'
