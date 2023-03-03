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
