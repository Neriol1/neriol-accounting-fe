import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import { http } from '../../shared/Http';
import { Bars } from './Bars';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Time } from '../../shared/time';

const DAY = 24 * 60 * 60 * 1000 //毫秒

type Data1Item = {happen_at:string, amount: number}
type Data1 = Data1Item[]

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const kind = ref('expenses')
    const data1 = ref<Data1>([])
    const betterData = computed<[string, number][]>(()=>{
      if(!props.startDate || !props.endDate) return []
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const days = diff / DAY + 1
      return Array.from({length:days},(_,i)=>{
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
        const item = data1.value[0]
        const amount = (item && new Date(item.happen_at).getTime() === time)
         ? data1.value.shift()!.amount
         : 0
         return [new Date(time).toISOString(),amount]
      })
    })
    onMounted(async ()=>{
      const response = await http.get<{ groups: Data1; summary: number }>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: 'itemSummary',
      })
      data1.value = response.data.groups
    })
    return () => (
      <div class={s.wrapper}>
         <FormItem label='类型' type="select" options={[
          { value: 'expenses', label: '支出' },
          { value: 'income', label: '收入' }
        ]} v-model={kind.value} />

        <LineChart data={betterData.value} />
        <PieChart />
        <Bars />
      </div>
    )
  }
})