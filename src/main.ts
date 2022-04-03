import Vue from 'vue'
import app from './app.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import CompositionApi from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(CompositionApi)

new Vue({
  router,
  vuetify,
  render: (h) => h(app),
}).$mount('#app')
