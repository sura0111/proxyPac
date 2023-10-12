import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { getBrowserTheme } from '@packages/core/utils'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: getBrowserTheme(),
    themes: {
      light: {
        colors: {
          primary: '#4285f4',
          secondary: '#ea4334',
          tertiary: '#ededed',
          border: '#aaaaaa',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          text: '#333333',
          'on-tertiary': '#333333',
          'on-background': '#333333',
          'on-text': '#ededed',
        },
      },
      dark: {
        colors: {
          primary: '#4285f4',
          secondary: '#ea4334',
          tertiary: '#303135',
          border: '#888888',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#202124',
          text: '#ededed',
          'on-background': '#bdc1c6',
          'on-tertiary': '#ededed',
          'on-text': '#333333',
        },
      },
    },
  },
})
