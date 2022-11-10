import { Overlay } from 'vant';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { ItemSummary } from '../components/item/ItemSummary';
import { Form, FormItem } from '../utils/Form';
import { OverlayIcon } from '../utils/Overlay';
import { Tab, Tabs } from '../utils/Tabs';
import { Time } from '../utils/time';
import { MainLayout } from './MainLayout';
import s from './TimeTabsLayout.module.scss';

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
})

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    }
  },
  setup: (props, context) => {
    const refSelected = ref('本月')
    const time = new Time()
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    })
    const timeList = [
      { start: time.firstDayOfMonth().format(), end: time.lastDayOfMonth().format() },
      { start: time.add(-1, 'month').firstDayOfMonth().format(), end: time.add(-1, 'month').lastDayOfMonth().format() },
      { start: time.firstDayOfYear().format(), end: time.lastDayOfYear().format() },
    ]
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
    }
    const onUpdateSelected = (value:string)=>{
      if(value === '自定义时间'){
        refOverlayVisible.value = true
      }
    }
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <OverlayIcon />,
          default: () => (
            <>
              <Tabs
                classPrefix={'customTabs'}
                v-model:selected={refSelected.value}
                onUpdate:selected={onUpdateSelected}>
                <Tab name='本月'>
                  <props.component startDate={timeList[0].start} endDate={timeList[0].end} />
                </Tab>
                <Tab name='上月'>
                  <props.component startDate={timeList[1].start} endDate={timeList[1].end} />
                </Tab>
                <Tab name='今年'>
                  <props.component startDate={timeList[2].start} endDate={timeList[2].end} />
                </Tab>
                <Tab name='自定义时间'>
                  <props.component startDate={customTime.start} endDate={customTime.end} />
                </Tab>
              </Tabs>

              <Overlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem type='date' label='开始时间' v-model={customTime.start}></FormItem>
                      <FormItem type='date' label='结束时间' v-model={customTime.end}></FormItem>
                      <FormItem>
                        <div class={s.actions}>
                          <button type='button' onClick={() => (refOverlayVisible.value = false)}>取消</button>
                          <button type='submit'>确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
