import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './router/routes'
import { history } from './utils/history'

import '@svgstore'

const router = createRouter({
  history: history,
  routes: routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
