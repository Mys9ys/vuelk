import {createStore} from "vuex";

export default createStore({
    state: {
        auth: true,
        loading: true,

        logo: require('@/assets/img/logo_n.svg'),
        partner_title_rus: 'ПАРТНЕРСКАЯ СИСТЕМА',
        partner_title_eng: 'PARTNERS SYSTEM',

        patients: [
            { name: 'Власова Анастасия Дмитриевна', status: 'Не отвечает больше положенного срока', status_bg: 'bg4', ava: 'ava1'},
            { name: 'Шкуренко Андрей Евгеньевич', status: 'Думает', status_bg: 'bg1', ava: 'ava3'},
            { name: 'Кузай Мария Михайловна', status: 'СОГЛАСИЕ НА КОНСУЛЬТАЦИЮ', status_bg: 'bg2', ava: 'ava4'},
            { name: 'Касаев Виталий Александрович', status: 'Пришёл на консультацию', status_bg: 'bg3', ava: 'ava7' },
        ],

        arPatients: [

            { name: 'Власова Анастасия Дмитриевна', status: 'Не отвечает больше положенного срока', status_bg: 'bg4', ava: 'ava1'},
            { name: 'Шкуренко Андрей Евгеньевич', status: 'Думает', status_bg: 'bg1', ava: 'ava3'},
            { name: 'Кузай Мария Михайловна', status: 'СОГЛАСИЕ НА КОНСУЛЬТАЦИЮ', status_bg: 'bg2', ava: 'ava4'},
            { name: 'Касаев Виталий Александрович', status: 'Пришёл на консультацию', status_bg: 'bg3', ava: 'ava7' },
        ]
    },
    getters: {
        isAuth(state) {
            return state.auth
        }
    },
    actions: {
        authSuccess({commit}){
            console.log('authSuccess')
            commit('IS_AUTH')
        }
    },
    mutations: {
        IS_AUTH(state){
            console.log('IS_AUTH')
            state.auth = true
        }

        // logout(state) {
        //     state.auth = false
        // },
    }
})
