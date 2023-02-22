import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage";
import PatientsPage from "@/pages/PatientsPage";
import BonusPage from "@/pages/BonusPage";
import ProfilePage from "@/pages/ProfilePage";
import AuthHello from "@/pages/AuthHello";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/patients',
        component: PatientsPage
    },
    {
        path: '/bonus',
        component: BonusPage
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: '/auth',
        component: AuthHello
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router