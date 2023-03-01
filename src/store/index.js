import {createStore} from "vuex";

export default createStore({
    state: {
        auth: true,
        loading: true,

        logo: require('@/assets/img/logo_n.svg'),
        partner_title_rus: 'ПАРТНЕРСКАЯ СИСТЕМА',
        partner_title_eng: 'PARTNERS SYSTEM'
    },
    getters: {
        isAuth(state) {
            return state.auth
        }
    },
    mutations: {
        // logout(state) {
        //     state.auth = false
        // },
    }
})
