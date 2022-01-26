import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
import PostsDetailPage from '@/views/PostsDetailPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/postsDetail',
        name: 'PostsDetailPage',
        component: PostsDetailPage
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
