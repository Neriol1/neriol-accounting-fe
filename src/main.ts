import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './route/routes'
import { history } from './shared/history'

import '@svgstore'

import 'vant/lib/index.css';
import { fetchMe, mePromise, refreshMe } from './shared/me'

const router = createRouter({
  history: history,
  routes: routes,
})
fetchMe()
router.beforeEach(async (to, from) => {
  if(['/','/start'].includes(to.path) || ['/welcome','/sign_in'].findIndex(v=>to.path.startsWith(v)) > -1){
    // if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
      return true
    } else {
      const path = mePromise.then(
        () => true,
        () => '/sign_in?return_to=' + to.path,
      )
      return path
    }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
