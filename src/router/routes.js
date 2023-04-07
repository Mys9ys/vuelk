import MainPage from "@/pages/MainPage";
import PatientsPage from "@/pages/PatientsPage";
import BonusPage from "@/pages/BonusPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import NotAuthHello from "@/pages/NotAuthHello";
import AuthPage from "@/pages/AuthPage";
import AuthSuccess from "@/pages/AuthSuccess";
import RecoverPage from "@/pages/RecoverPage";
import RecoverMail from "@/pages/RecoverMail";
import RecoverSms from "@/pages/RecoverSms";
import RecoverSuccess from "@/pages/RecoverSuccess";
import PatientSend from "@/pages/PatientSend";
import SendSuccess from "@/pages/SendSuccess";
import RegisterSuccess from "@/pages/RegisterSuccess";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const routes = [
    {
        path: '/main',
        name: 'main',
        component: MainPage,
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
        path: '/',
        name: 'start',
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
        path: '/recover',
        component: RecoverPage,
    },
    {
        path: '/recover_mail',
        component: RecoverMail
    },
    {
        path: '/recover_sms',
        component: RecoverSms
    },

    {
        path: '/patient_send',
        component: PatientSend
    },

    {
        path: '/auth_success',
        component: AuthSuccess
    },
    {
        path: '/recover_success',
        component: RecoverSuccess
    },
    {
        path: '/register_success',
        component: RegisterSuccess
    },
    {
        path: '/send_success',
        component: SendSuccess
    },
    {
        path: '/policy',
        component: PrivacyPolicy
    },

]

export default routes