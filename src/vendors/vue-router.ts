import { ComponentInternalInstance, getCurrentInstance, toRef } from '@vue/composition-api'
import VueRouter from 'vue-router'

export const useRoute = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const route = toRef(instance.proxy, '$route')
  return route
}

export const useRouter = () => {
  const router = getCurrentInstance()?.proxy.$router
  return router as VueRouter
}
