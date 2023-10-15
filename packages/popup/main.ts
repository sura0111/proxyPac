import '@packages/popup/styles/main.scss'
import 'highlight.js/styles/atom-one-dark.css'
import { createApp } from 'vue'
import { vuetify, router } from '@packages/popup/plugins'
import popup from './popup.vue'

const app = createApp(popup)

app.use(vuetify)
app.use(router)
app.mount('#app')
