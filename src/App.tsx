import { defineComponent } from 'vue'
import './App.scss'

export const App = defineComponent({
  setup() {
    return () => (
      <div class='page'>
        <router-view></router-view>
      </div>
    )
  },
})
