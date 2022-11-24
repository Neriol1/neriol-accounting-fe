import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function,
    },
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    const onClickSignIn = () => {}
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            <h2>未登录用户</h2>
            <p>点击这里登陆</p>
          </section>
          <nav>
            <ul class={s.action_list} onClick={onClickSignIn}>
              <li>
                <RouterLink class={s.action} to='/statistics'>
                  <Icon name='menuChart' class={s.icon}></Icon>
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink class={s.action} to='/export'>
                  <Icon name='export' class={s.icon}></Icon>
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink class={s.action} to='/notify'>
                  <Icon name='notify' class={s.icon}></Icon>
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    )
  },
})


export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClick = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => (
      <>
         <Icon name='menu' class={s.icon} onClick={onClick} />
         {refOverlayVisible.value && <Overlay onClose={() => (refOverlayVisible.value = false)} />}
      </>
    )
  },
})