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

            // file: '',
            file: '/upload/main/d8e/d8e464c093083bc55434c13989838971.jpeg'
        },

        checkPhone: {
            type: 'checkPhone',
            phone: ''
        },

        checkMail: {
            type: 'checkPhone',
            mail: ''
        },

        registerError: '',


        baseUrl: baseConfig.BASE_URL
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

        setRegisterError(state, mes) {
            state.registerError = mes
        },
    },
    actions: {

        async avaLoadRequest({state, commit}) {
            try {

                const response = await axios.post(state.baseUrl + 'reg_ava/', state.avaFileReg,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setAvaLink', response.data.link)
                }

            } catch (e) {
                console.log('error', e)
            }
        },

        async checkMailUniqRequest({state, commit}){
            try {
                const response = await axios.post(state.baseUrl + 'register/', state.checkMail,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
            }
            catch (e) {
                console.log('error', e)
            }
        },

        async checkPhoneUniqRequest({state, commit}){
            try {
                const response = await axios.post(state.baseUrl + 'register/', state.checkPhone,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
            }
            catch (e) {
                console.log('error', e)
            }
        },

        async registrationRequest({state, commit}) {
            try {

                const response = await axios.post(state.baseUrl + 'register/', state.regData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setAvaLink', response.data.link)
                } else {
                    console.log('error', response.data.mes)
                    commit('setRegisterError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        }
    },
    namespaced: true
}