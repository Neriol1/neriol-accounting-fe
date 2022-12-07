import { defineComponent, PropType, ref } from 'vue'
import { Icon } from '../../shared/Icon'
import s from './InputPad.module.scss'
import { DatetimePicker, Popup } from 'vant';
import { Time } from '../../shared/time';

export const InputPad = defineComponent({
  props: {
    amount:Number,
    happenAt:String
  },
  setup: (props, context) => {
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0')
    const refDatePickerVisible = ref(false)
    const appendText = (n: number | string) => {
      const nString = n.toString()
      const doIndex = refAmount.value.indexOf('.')
      if(refAmount.value.length > 13) return 
      //限制两位小数
      if(doIndex >= 0 && refAmount.value.length - doIndex> 2){
        return 
      }
      if(nString === '.'){
        if(doIndex >= 0) return
      }else if(nString === '0'){
       if(doIndex === -1){
          if(refAmount.value === '0') return
       }
      }else{
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }

      refAmount.value += n.toString()
    }
    const buttons = [
      { text: '1', onclick: () => {appendText(1)} },
      { text: '2', onclick: () => {appendText(2)} },
      { text: '3', onclick: () => {appendText(3)} },
      { text: '4', onclick: () => {appendText(4)} },
      { text: '5', onclick: () => {appendText(5)} },
      { text: '6', onclick: () => {appendText(6)} },
      { text: '7', onclick: () => {appendText(7)} },
      { text: '8', onclick: () => {appendText(8)} },
      { text: '9', onclick: () => {appendText(9)} },
      { text: '.', onclick: () => {appendText('.')} },
      { text: '0', onclick: () => {appendText(0)} },
      { text: '清空',onclick: () => { refAmount.value = '0'},},
      { text: '提交', onclick: () => {
        context.emit('update:amount', parseFloat(refAmount.value) * 100)
      } },
    ]

    const showDatePicker = ()=>refDatePickerVisible.value = true
    const hideDatePicker = ()=>refDatePickerVisible.value = false
    const setDate = (date:Date)=>{ 
      context.emit('update:happenAt',date.toISOString())
      hideDatePicker()
    }
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name='date' class={s.icon}></Icon>
            <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
            <Popup v-model:show={refDatePickerVisible.value} position="bottom" >
              <DatetimePicker value={props.happenAt} type="date" title="选择年月日" onConfirm={setDate} onCancel={hideDatePicker}/>
            </Popup>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map((button, index) => (
            <button class={s.button} key={index} onClick={button.onclick}>
              {button.text}
            </button>
          ))}
        </div>
      </>
    )
  },
})
