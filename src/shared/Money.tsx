import { defineComponent, PropType, ref } from 'vue'
export const Money = defineComponent({
  props: {
    value: {
       type: Number as PropType<number>,
       required:true
    },
  },
  setup: (props, context) => {
    return () => <span>{addZero(props.value / 100)}</span>
  },
})
export const addZero = (n:number)=>{
  const nString = n.toString()
  const doIndex = nString.indexOf('.')
  if(doIndex < -1){
    return nString + '.00'
  }else if(nString.substring(doIndex).length === 2){
    return nString + '0'
  }else{
    return nString
  }
}

export const getMoney = (n: number) => {
  return addZero(n / 100)
}