import { defineComponent, PropType, reactive, ref } from 'vue'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../utils/Button'
import { Form, FormItem } from '../utils/Form'
import { Icon } from '../utils/Icon'
import { validate } from '../utils/validate'
import s from './SignInPage.module.scss'
export const SignInpage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: '',
    })

    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({
      email: [],
      code: [],
    })

    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [],
        code: [],
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          { key: 'email', type: 'pattern', pattern: /.+@.+/, message: '必须是邮箱地址' },
          { key: 'code', type: 'required', message: '必填' },
        ]),
      )
    }

    const onClickSendValidationCode = ()=>{
      console.log(111);
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
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    )
  },
})
