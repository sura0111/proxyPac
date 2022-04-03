import '@/plugins'
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import popup from '@/popup/popup.vue'
import router from '@/plugins/popupRouter'

const app = new Vue({ vuetify, router, render: (h) => h(popup) })

app.$mount('#app')
