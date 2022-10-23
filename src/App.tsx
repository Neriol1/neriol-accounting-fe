import { defineComponent } from 'vue'
import s from './App.scss'

export const App = defineComponent({
  setup() {
    return () => (
      <div>
        <router-view></router-view>
      </div>
    )
  },
})
