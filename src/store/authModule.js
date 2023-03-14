/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const authModule = {
    state: () => ({
        authData: {
            mail: null,
            pass: null
        },
        authInfo: {},
        baseUrl: baseConfig.BASE_URL
    }),
    getters: {},
    mutations: {
        setAuthData(state, authData){
            state.authData = authData
        },
        setAuthInfo(state, authInfo){
            state.authInfo = authInfo
        }
    },
    actions: {
        async authRequest({state, commit}) {
            try {
                const response = await axios.post(state.baseUrl + 'auth/', state.authData)
                commit('setAuthInfo', response.data)
                console.log(response.data)
            }  catch (e) {
                console.log('error', e)
            }
        }
    },
    namespaced: true
}