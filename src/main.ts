import {createApp} from 'vue'
import {Quasar} from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

import App from './App.vue'
import './assets/main.css'

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
    .mount('#app')
