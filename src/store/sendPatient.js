/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const authModule = {
    state: () => ({

        patientData: {

        }

    }),

    getters: {},
    mutations: {
        setPatientData(state, data) {
            state.patientData = data
        },

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
                }

            } catch (e) {
                console.log('error', e)
            }
        },
    }

}