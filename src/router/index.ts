import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/view/Dashboard.vue";
import Users from "@/view/Users.vue";
import Role from "@/view/Role.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/roles',
        component: Role
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router