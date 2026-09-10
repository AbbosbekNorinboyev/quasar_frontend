import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/view/Dashboard.vue";
import Users from "@/view/Users.vue";
import Role from "@/view/Role.vue";
import Setting from "@/view/Setting.vue";
import Login from "@/view/Login.vue";
import Register from "@/view/Register.vue";
import {isAuthenticated} from '@/service/authService'

const routes = [
    {
        path: '/',
        redirect: '/register'
    },
    {
        path: '/login',
        component: Login,
        meta: {public: true}
    },
    {
        path: '/register',
        component: Register,
        meta: {public: true}
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        path: '/users',
        component: Users,
        meta: {requiresAuth: true}
    },
    {
        path: '/roles',
        component: Role,
        meta: {requiresAuth: true}
    },
    {
        path: '/settings',
        component: Setting,
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const authenticated = isAuthenticated()

    if (to.meta.requiresAuth && !authenticated) {
        return {path: '/login', query: {redirect: to.fullPath}}
    }

    if (to.meta.public && authenticated) {
        return '/dashboard'
    }

    return true
})

export default router