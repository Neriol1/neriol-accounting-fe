import { defineComponent } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import s from './Tag.module.scss'
import '../../shared/validate'
import { TagForm } from './TagForm'
import { BackIcon } from '../../shared/BackIcon'
import { useRoute, useRouter } from 'vue-router'
import { Dialog } from 'vant'
import { http } from '../../shared/Http'
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const numberId = parseInt(route.params.id!.toString())
    if(isNaN(numberId)){
      return <div>id 不存在</div>
    }
    const onError = () => {
      Dialog.alert({title:'提示',message:'删除失败'})
    }
    const onDelete = async (options?:{withItems?:boolean}) =>{
      await Dialog.confirm({
        title: '确认',
        message: '确认删除吗？'
      })
      await http.delete(`/tags/${numberId}`,{
        withItems:options?.withItems ? 'true' : 'false'
      }).catch(onError)
      router.back()
    }
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <BackIcon />,
            title: () => <span>编辑标签</span>,
            default: () => (
              <>
                <TagForm id={numberId}></TagForm>
                <div class={s.actions}>
                  <Button level='danger' class={s.removeTags} onClick={() => onDelete}>删除标签</Button>
                  <Button level='danger' class={s.removeTagsAndItems} onClick={() => onDelete({withItems:true})}>删除标签和记账</Button>
                </div>
              </>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
