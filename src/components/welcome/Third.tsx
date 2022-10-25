import chart from '../../assets/icons/chart.svg'
import s from './WelcomeLayout.module.scss'
import { WelcomeLayout } from './WelcomeLayout'

export const Third = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={chart} />,
      title: () => (
        <h2>
          数据可视化
          <br />
          收支一目了然
        </h2>
      ),
      actions: () => (
        <>
          <router-link class={s.fake} to=''>
            跳过
          </router-link>
          <router-link to='/welcome/4'>下一页</router-link>
          <router-link to='/start'>跳过</router-link>
        </>
      ),
    }}
  </WelcomeLayout>
)
