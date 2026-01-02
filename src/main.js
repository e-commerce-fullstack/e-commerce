import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Add all solid icons to library
library.add(fas)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)


app.use(createPinia())
app.use(router)


// now the store is fully initialized
import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
authStore.verifyToken() // run once globally

app.mount('#app')
