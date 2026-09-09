import {createRouter, createWebHistory} from 'vue-router'

import Register from '@/view/Register.vue'
import Login from '@/view/Login.vue'
import Role from "@/view/Role.vue";
import Users from "@/view/Users.vue";
import Dashboard from "@/view/Dashboard.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            guestOnly: true
        }
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
        path: '/users',
        name: 'users',
        component: Users
    },
    {
        path: '/roles',
        name: 'role',
        component: Role
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router