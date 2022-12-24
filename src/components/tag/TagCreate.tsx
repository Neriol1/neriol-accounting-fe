import { defineComponent } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { Icon } from '../../shared/Icon'
import '../../shared/validate'
import { TagForm } from './TagForm'
export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <>
        <MainLayout>
          {{
            icon: () => <BackIcon />,
            title: () => <span>新建标签</span>,
            default: () => (
             <TagForm></TagForm>
            ),
          }}
        </MainLayout>
      </>
    )
  },
})
