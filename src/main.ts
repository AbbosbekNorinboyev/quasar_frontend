import {createApp} from 'vue'
import {Quasar} from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import './assets/main.css'
import router from './router'

createApp(App)
    .use(Quasar, {
        config: {
            brand: {
                primary: '#1976D2',
                secondary: '#26A69A',
                accent: '#9C27B0',
            },
        },
    })
    .use(router)
    .mount('#app')
