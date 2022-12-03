import { defineComponent, PropType, ref } from 'vue'
export const SkipFeatures = defineComponent({
  setup: (props, context) => {
    const onClick = ()=>{
      localStorage.setItem('skipFeatures','yes')
    }
    return () => (
      <span onClick={onClick}>
         <router-link to='/start'>跳过</router-link>
      </span>
    )
  },
})