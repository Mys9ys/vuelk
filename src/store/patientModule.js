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

                const response = await axios.post(baseConfig.BASE_URL + 'send_patient/', state.patientData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
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