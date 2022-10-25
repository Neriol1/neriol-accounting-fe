import clock from '../../assets/icons/clock.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout'

export const Second = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={clock} />,
      title: () => (
        <h2>
          每日提醒
          <br /> 不会遗漏每一笔账单
        </h2>
      ),
      actions: () => (
        <>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/3'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </>
      ),
    }}
  </WelcomeLayout>
)
