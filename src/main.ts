import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'; // Import MDI font icons


import App from './App.vue'
import router from './router'


const app = createApp(App)


const vuetify = createVuetify({
  // ... your configuration
  icons: {
    defaultSet: 'mdi',

  }
})

app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(vuetify)