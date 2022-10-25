import piggy_bank from '../../assets/icons/piggy_bank.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout'
import { FunctionalComponent } from 'vue'
export const First: FunctionalComponent = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={piggy_bank} />,
      title: () => (
        <h2>
          会挣钱
          <br />
          还要会省钱
        </h2>
      ),
      actions: () => (
        <>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/2'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </>
      ),
    }}
  </WelcomeLayout>
)
