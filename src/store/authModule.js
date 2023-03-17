/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const authModule = {
    state: () => ({
        loginData: {
            type: null,
            mail: null,
            pass: null,
        },

        loginError: '',

        authData: {
            type: null,
            token: localStorage.getItem('lk_token') || '',
        },

        isAuth: localStorage.getItem('lk_auth') || false,

        userInfo: [],

        baseUrl: baseConfig.BASE_URL
    }),
    getters: {},
    mutations: {
        setAuthData(state, authData) {
            state.authData = authData
        },

        setLoginData(state, loginData) {
            state.loginData = loginData
            console.log('fga', state.loginData)
        },

        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },

        setLoginError(state, loginError) {
            console.log('fga')
            state.loginError = loginError
        },

        setAuth(state) {
            state.isAuth = true
            localStorage.setItem('lk_auth', 'true')
        },

        setToken(state, token){
            state.authData.token = token
            localStorage.setItem('lk_token', token)
        },

        setTypeRequest(state, type){
            state.authData.type = type
        }
    },
    actions: {
        authSuccess({commit}) {
            commit('setAuth')
        },

        async authRequest({state, commit}) {
            console.log('axios data', state.loginData)

            try {
                const response = await axios.post(state.baseUrl + 'auth/', state.loginData)

                if (response.data.status == 'ok') {
                    commit('setUserInfo', response.data.info)
                    commit('setAuth')
                    commit('setToken', response.data.info.UF_TOKEN)
                    commit('setLoginError', '')
                }
                if (response.data.status == 'error') commit('setLoginError', response.data.mes)

                console.log(response.data)
            } catch (e) {
                console.log('error', e)
            }
        },

        async loginRequest({state, commit}) {
            console.log('xhz')
            commit('setTypeRequest', 'tokenLogin')

            try {
                const response = await axios.post(state.baseUrl + 'auth/', state.authData)

                if (response.data.status == 'ok') {
                    commit('setUserInfo', response.data.info)
                    commit('setAuth')
                }

                if (response.data.status == 'error') commit('setLoginError', response.data.mes)

            } catch (e) {
                console.log('error', e)
            }
        },
    },
    namespaced: true
}