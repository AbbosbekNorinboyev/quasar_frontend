import {createRouter, createWebHistory} from 'vue-router'

import Register from '@/view/Register.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router