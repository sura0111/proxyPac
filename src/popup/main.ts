import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import '@/plugins/store'
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import popup from '@/popup/popup.vue'
import router from '@/popup/router'

const app = new Vue({
  vuetify,
  router,
  render: (h) => h(popup),
})

app.$mount('#app')
