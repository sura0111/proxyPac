import { createRouter, createMemoryHistory } from 'vue-router'
import { PageName } from '@packages/popup/constants/page'
import { Index, Settings, AddPac, EditPac } from '@packages/popup/pages'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/settings',
      name: PageName.settings,
      component: Settings,
    },
    {
      path: '/add_pac',
      name: PageName.addPac,
      component: AddPac,
    },
    {
      path: '/edit_pac',
      name: PageName.editPac,
      component: EditPac,
      props: (route) => {
        return { pac: JSON.parse(route.query.pac as string) }
      },
    },
    {
      path: '/',
      name: PageName.index,
      component: Index,
    },
  ],
})

declare module 'vue-router' {
  interface RouteMeta {
    previousRouteName?: RouteRecordName | null
  }
}

router.beforeEach((to, from) => {
  to.meta.previousRouteName = from.name ?? null
})
