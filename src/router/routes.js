import MainPage from "@/pages/MainPage";
import PatientsPage from "@/pages/PatientsPage";
import BonusPage from "@/pages/BonusPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import NotAuthHello from "@/pages/NotAuthHello";
import AuthPage from "@/pages/AuthPage";
import AuthSuccess from "@/pages/AuthSuccess";

const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/patients',
        component: PatientsPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/bonus',
        component: BonusPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/hello',
        name: 'hello',
        component: NotAuthHello
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '/auth_success',
        component: AuthSuccess
    },
]

export default routes