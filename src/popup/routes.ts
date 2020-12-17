import { RouteConfig } from 'vue-router'
import { settings, switcher, addPac, editPac } from '@/popup/views'
import { PAGE } from '@/constants'

const routes: Array<RouteConfig> = [
  {
    path: '/settings',
    name: PAGE.settings,
    component: settings,
  },
  {
    path: '/add_pac',
    name: PAGE.addPac,
    component: addPac,
  },
  {
    path: '/edit_pac',
    name: PAGE.editPac,
    component: editPac,
    props: true,
  },
  {
    path: '/',
    name: PAGE.switcher,
    component: switcher,
  },
]

export default routes
