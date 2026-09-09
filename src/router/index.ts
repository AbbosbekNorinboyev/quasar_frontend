import {createRouter, createWebHistory} from 'vue-router'

import Register from '@/view/Register.vue'
import Login from '@/view/Login.vue'

const routes = [
    {
        path: '/',
        redirect: '/register'
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            guestOnly: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/register'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            guestOnly: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router