import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { Button } from '../../shared/Button';
import { Datetime } from '../../shared/Datetime';
import { FloatButton } from '../../shared/FloatButton';
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import s from './ItemSummary.module.scss';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
       type: String as PropType<string>,
       required:false
    },
    endDate: {
      type: String as PropType<string>,
      required:false
   },
  },
  setup: (props, context) => {
    const items = ref<Item[]>([])
    const page = ref(0)
    const hasMore = ref(false)
    const fetchItems = async () => {
      if(!props.startDate || !props.endDate) return 
      const response = await http.get<Resources<Item>>('/items', {
        page: page.value + 1,
        created_after: props.startDate,
        created_before: props.endDate,
        _mock: 'itemIndex',
      })
      const { pager, resources } = response.data
      items.value.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value +=  1
    }
    onMounted(fetchItems)
    watch(()=>[props.startDate,props.endDate],()=>{
      items.value = []
      page.value = 0
      hasMore.value = false
      fetchItems()
    })
    const itemsBalance = reactive({
      income: 0,
      expenses: 0,
      balance: 0,
    })
    const fetchBalance = async () =>{
      if(!props.startDate || !props.endDate) return 
      const response = await http.get('/items/balance',{
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance',
      })
      Object.assign(itemsBalance, response.data)
    }
    onMounted(fetchBalance)
    watch(() => [props.startDate, props.endDate],() => {
        Object.assign(itemsBalance, { income: 0, expenses: 0, balance: 0 })
        fetchBalance()
      })
    return () => (
      <div class={s.wrapper}>
        {items.value ? (
          <>
            <ul class={s.total}>
              <li>
                <span>??????</span>
                <span>{itemsBalance.income}</span>
              </li>
              <li>
                <span>??????</span>
                <span>{itemsBalance.expenses}</span>
              </li>
              <li>
                <span>?????????</span>
                <span>{itemsBalance.balance}</span>
              </li>
            </ul>
            <ol class={s.list}>
              {items.value.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags![0].sign}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{item.tags![0].name}</span>
                      <span class={s.amount}>
                        ???<Money value={item.amount} />
                      </span>
                    </div>
                    <div class={s.time}>
                      <Datetime value={item.happen_at} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            {hasMore.value ? <Button onClick={fetchItems}>????????????</Button> : <div class={s.more}>????????????</div>}
          </>
        ) : (
          <div>????????????</div>
        )}

        <FloatButton iconName='add' />
      </div>
    )
  }
})