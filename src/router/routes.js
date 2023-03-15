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

const routes = [
    {
        path: '/main',
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
        path: '/recover_success',
        component: RecoverSuccess
    },
    {
        path: '/patient_send',
        component: PatientSend
    },
    {
        path: '/send_success',
        component: SendSuccess
    },

]

export default routes