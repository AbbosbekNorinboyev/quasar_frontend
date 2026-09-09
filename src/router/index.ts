import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/view/Dashboard.vue";
import Users from "@/view/Users.vue";
import Role from "@/view/Role.vue";
import Setting from "@/view/Setting.vue";
import Activity from "@/view/Activity.vue";
import Help from "@/view/Help.vue";

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
    },
    {
        path: '/activity',
        component: Activity
    },
    {
        path: '/settings',
        component: Setting
    },
    {
        path: '/help',
        component: Help
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router