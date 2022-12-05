import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBool } from '../hooks/useBool'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../shared/Button'
import { Form, FormItem } from '../shared/Form'
import { http } from '../shared/Http'
import { Icon } from '../shared/Icon'
import { refreshMe } from '../shared/me'
import { hasErrors, validate } from '../shared/validate'
import s from './SignInPage.module.scss'
export const SignInpage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: '',
    })
    const refValidationCode = ref<any>()
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({
      email: [],
      code: [],
    })
    const { ref: refDisabled, toggle, on: disable, off: enable } = useBool(false)
    const router = useRouter()
    const route = useRoute()
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, { email: [], code: [], })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          { key: 'email', type: 'pattern', pattern: /.+@.+/, message: '必须是邮箱地址' },
          { key: 'code', type: 'required', message: '必填' },
        ]),
      )
      if(!hasErrors(errors)){
        const response = await http.post<{jwt:string}>('/session', formData)
        localStorage.setItem('jwt',response.data.jwt)
        const returnTo = route.query.return_to?.toString()
        refreshMe()
        router.push(returnTo || '/')
      }
    }
    const onError = (error: any) => Object.assign(errors, error.response.data.errors) 
    const onClickSendValidationCode = async ()=>{
      disable()
      const response = await http.post('validation_codes',{email:formData.email})
        .catch(onError)
        .finally(enable)
      refValidationCode.value.startCountDown()
    }

    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <Icon name='left' />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name='mangosteen' />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label='邮箱地址'
                  type='text'
                  v-model={formData.email}
                  placeholder='请输入邮箱，然后点击发送验证码'
                  error={errors['email']?.[0]}
                />
                <FormItem
                  v-model={formData.code}
                  label='验证码'
                  type='validationCode'
                  placeholder='请输入六位数字'
                  error={errors['code']?.[0]}
                  onClick={onClickSendValidationCode}
                  ref={refValidationCode}
                  countFrom={1}
                  disabled={refDisabled.value}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button type='submit'>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
