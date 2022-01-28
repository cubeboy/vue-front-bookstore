import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/main',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/postsDetail',
        name: 'PostsDetailPage',
        component: () => import('@/views/PostsDetailPage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
