/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const patientModule = {
    state: () => ({

        patientData: {

        },

        patientError: {
            mes: ''
        },

        baseUrl: baseConfig.BASE_URL

    }),

    getters: {},
    mutations: {
        setPatientData(state, data) {
            state.patientData = data
        },

        setPatientError(state, mes){
            state.patientError = mes
        }

    },

    actions: {

        async sendPatientRequest({state, commit}) {
            try {

                const response = await axios.post(state.baseUrl + 'send_patient/', state.patientData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    console.log('axios data', response.data)
                    commit('setPatientData', response.data)
                } else {
                    commit('setPatientError', response.data.mes)
                }

            } catch (e) {
                console.log('error', e)
            }
        },
    },
    namespaced: true
}