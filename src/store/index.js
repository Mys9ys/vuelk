import {createStore} from "vuex";

export default createStore({
    state: {
        auth: false,
        loading: true,

        logo: require('@/assets/img/logo_n.svg'),
        partner_title_rus: 'ПАРТНЕРСКАЯ СИСТЕМА',
        partner_title_eng: 'PARTNERS SYSTEM',

        month: [
            "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
        ],

        profile_info: {
            name: 'Иванова Дарья', phone: '+7 (999) 999-99-99', mail: 'admin@eurokappa.ru',
            patients: 128, contracts: 167, bonuses: '230К'
        },

        patients: [
            { name: 'Власова Анастасия Дмитриевна', status: 'Не отвечает больше положенного срока', status_bg: 'bg4', ava: 'ava1'},
            { name: 'Шкуренко Андрей Евгеньевич', status: 'Думает', status_bg: 'bg1', ava: 'ava3'},
            { name: 'Кузай Мария Михайловна', status: 'СОГЛАСИЕ НА КОНСУЛЬТАЦИЮ', status_bg: 'bg2', ava: 'ava4'},
            { name: 'Касаев Виталий Александрович', status: 'Пришёл на консультацию', status_bg: 'bg3', ava: 'ava7' },
        ],

        arPatients: [
            {day: '02.7',
                patients: [
                    { name: 'Власова Анастасия Дмитриевна', status: 'Не отвечает больше положенного срока', status_bg: 'bg4', ava: 'ava1'},
                    { name: 'Шкуренко Андрей Евгеньевич', status: 'Думает', status_bg: 'bg1', ava: 'ava3'},
                ]},
            {day: '01.23',
                patients: [
                    { name: 'Кузай Мария Михайловна', status: 'СОГЛАСИЕ НА КОНСУЛЬТАЦИЮ', status_bg: 'bg2', ava: 'ava4'},
                    { name: 'Касаев Виталий Александрович', status: 'Пришёл на консультацию', status_bg: 'bg3', ava: 'ava7' },
                ]},
            {day: '01.21',
                patients: [
                    { name: 'Касаев Виталий Александрович', status: 'Пришёл на консультацию', status_bg: 'bg3', ava: 'ava7' },
                ]},
            {day: '01.17',
                patients: [
                    { name: 'Кузай Мария Михайловна', status: 'СОГЛАСИЕ НА КОНСУЛЬТАЦИЮ', status_bg: 'bg2', ava: 'ava4'},
                ]}
        ],
        bonuses: [
            {day: '01.23',
                patients: [
                    { name: 'Кузай Мария Михайловна', status: 'Подписан договор'},
                    { name: 'Касаев Виталий Александрович', status: 'Пришел в клинику'},
                ]},
            {day: '01.21',
                patients: [
                    { name: 'Касаев Виталий Александрович', status: 'Подписан договор'},
                ]},
            {day: '01.17',
                patients: [
                    { name: 'Кузай Мария Михайловна', status: 'Подписан договор'},
                ]}
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
