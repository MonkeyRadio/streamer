import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { md3 } from 'vuetify/blueprints'
import { i18n } from '@renderer/i18n/i18n'
import { createMonkeyRadioAPI } from '@renderer/plugins/monkeyRadioAPI'

const monkeyRadioTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#9d5762',
    'primary-darken-1': '#9d576229',
    secondary: '#ff8c00',
    'secondary-darken-1': '#ff8c00'
  },
  variables: {}
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  blueprint: md3,
  theme: {
    defaultTheme: 'monkeyRadioTheme',
    themes: {
      monkeyRadioTheme
    }
  }
})

const monkeyradioAPI = createMonkeyRadioAPI()

createApp(App)
  .use(vuetify)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(monkeyradioAPI)

  .mount('#app')
