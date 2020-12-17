import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import settings from '@/popup/views/settings.vue'
import switcher from '@/popup/views/switcher.vue'
import addPac from '@/popup/views/addPac.vue'
import editPac from '@/popup/views/editPac.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/settings',
    name: 'settings',
    component: settings,
  },
  {
    path: '/add_pac',
    name: 'addPac',
    component: addPac,
  },
  {
    path: '/edit_pac',
    name: 'editPac',
    component: editPac,
    props: true,
  },
  {
    path: '/',
    name: 'switcher',
    component: switcher,
  },
]

const router = new VueRouter({
  routes,
})

export default router
