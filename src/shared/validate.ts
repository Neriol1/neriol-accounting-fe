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
  rules.forEach(rule=>{
    const {key,type,message} = rule
    const value = formData[rule.key]
    switch (type) {
      case 'required':
        if(isEmpty(value)){
          errors[rule.key] = errors[rule.key] ?? []
          errors[rule.key]?.push(rule.message)
        }
        break;
      case 'pattern':
        if(!isEmpty(value) && !rule.pattern.test(value as string)){
          errors[rule.key] = errors[rule.key] ?? []
          errors[rule.key]?.push(rule.message)
        }
        break;
      default:
        break;
    }  
  })
  return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === '' 
}

export const hasErrors = (errors: Record<string,string[]>) => {
  // return Object.values(errors).some(v=>v.length>0) || false
  let result = false
  for (const key in errors) {
    if(errors[key].length > 0){
      result = true
      break
    }
  }
  return result
}
