import s from './welcome.module.scss'
import { FunctionalComponent } from 'vue'
export const First: FunctionalComponent = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#piggy_bank'></use>
    </svg>
    <h2>
      会挣钱
      <br />
      还要会省钱
    </h2>
  </div>
)

First.displayName = 'First'
