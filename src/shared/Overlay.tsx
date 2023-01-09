import { Dialog } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from './Icon'
import { mePromise } from './me'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function,
    },
  },
  setup: (props, context) => {
    const route = useRoute()
    const close = () => {
      props.onClose?.()
    }
    // mePromise
    const me = ref<User>()
    onMounted(async ()=>{
      const response = await mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async ()=>{
      await Dialog.confirm({
        title: '确认',
        message: '确定要退出登录吗？'
      })
      localStorage.removeItem('jwt')
      me.value = undefined
    }
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登陆</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
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