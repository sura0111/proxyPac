import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
]

const router = new VueRouter({
  routes,
})

export default router
