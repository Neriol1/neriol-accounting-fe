interface FData {
  [key: string]: string | number | null | undefined | FData
}

type Rule<T> = {
  message: string
  key: keyof T
} & ({ type: 'required' } | { type: 'pattern'; pattern: RegExp })
type Rules<T> = Rule<T>[]

export type { FData, Rule, Rules }

export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.forEach((rule) => {
    const value = formData[rule.key]
    if (rule.type === 'required') {
      if (!value || value === '') {
        errors[rule.key] = errors[rule.key] ?? []
        errors[rule.key]?.push(rule.message)
      }
    } else if (rule.type === 'pattern') {
      if (!rule.pattern.test(value as string)) {
        errors[rule.key] = errors[rule.key] ?? []
        errors[rule.key]?.push(rule.message)
      }
    }
  })
  return errors
}

// let pdata = {
//   name: 'ffff',
//   sign: '',
// }
// let prules: Rules<typeof pdata> = [
  // { key: 'name', type: 'required', message: '请输入姓名' },
//   { key: 'sign', type: 'required', message: '请输入' },
//   { key: 'sign', type: 'pattern', pattern: /^\.{4,5}$/, message: '4-5位' },
// ]

// let err = validate(pdata, prules)
// console.log(err, 'err')
