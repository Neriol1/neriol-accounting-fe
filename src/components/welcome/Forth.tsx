import cloud from '../../assets/icons/cloud.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout'

export const Forth = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={cloud} />,
      title: () => (
        <h2>
          云备份
          <br />
          再也不怕数据丢失
        </h2>
      ),
      actions: () => (
        <>
          <router-link class={s.fake} to=''></router-link>
          <router-link to='/start'>开始记账</router-link>
          <router-link class={s.fake} to='/start'></router-link>
        </>
      ),
    }}
  </WelcomeLayout>
)
