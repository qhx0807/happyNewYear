import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Show from '@/components/Show'
import ShowInfo from '@/components/ShowInfo'
import Danmu from '@/components/Danmu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          name: 'Show',
          component: Show
        },
        {
          path: 'show',
          name: 'Show',
          component: Show
        },
        {
          path: 'danmu',
          name: 'Danmu',
          component: Danmu
        },
        {
          path: 'showinfo/:id',
          name: 'ShowInfo',
          component: ShowInfo
        }
      ]
    }
  ]
})
