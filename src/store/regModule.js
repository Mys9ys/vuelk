/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const regModule = {
    state: () => ({

        avaLink: '',
        // regAva: '/upload/resize_cache/main/3a9/105_105_175511db9cefbc414a902a46f1b8fae16/3a95097da41b865d85980102e75e1202.jpeg'

        avaFileReg: {
            file: ''
        },

        regData: {
            type: 'reg',

            // file: '',
            file: '/upload/main/d8e/d8e464c093083bc55434c13989838971.jpeg'
        },

        checkUniqArray: {
            type: 'check',
            name: '',
            value: ''
        },

        checkUniqError: {
            name: '',
            mes: ''
        },

        registerError: '',

    }),

    getters: {},
    mutations: {
        setAvaLink(state, avaLink) {
            state.avaLink = avaLink
            state.regData.file = avaLink
        },
        setAvaFileReg(state, file) {
            state.avaFileReg.file = file
        },

        setCheckUniqError(state, arr){
            state.checkUniqError.name = arr.name
            state.checkUniqError.mes = arr.mes
        },

        setRegisterError(state, mes) {
            state.registerError = mes
        },
    },
    actions: {

        async avaLoadRequest({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'reg_ava/', state.avaFileReg,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    commit('setAvaLink', response.data.link)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async checkUniqValueRequest({state, commit}){
            try {
                const response = await axios.post(baseConfig.BASE_URL + 'register/', state.checkUniqArray,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'error') {
                    commit('setCheckUniqError', response.data.result)
                }
            }
            catch (e) {
                console.log('error', e)
            }
        },

        async registrationRequest({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'register/', state.regData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    commit('setAvaLink', response.data.link)
                } else {
                    commit('setRegisterError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        }
    },
    namespaced: true
}