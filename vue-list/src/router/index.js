import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('./../views/index')
const IndexDeta = () => import('./../views/indexDeta')

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/indexDeta/:id',
      name: 'IndexDeta',
      component: IndexDeta
    }
  ]
})

export default router