/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const infoModule = {
    state: () => ({

        infoRequestData: {
            token: '',
            type: ''
        },

        requestInfo: {},

    }),

    getters: {},
    mutations: {
        setInfo(state, data) {
            state.requestInfo = data
        },

    },

    actions: {

        async getProfileInfoRequest({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'patient_info/', state.infoRequestData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    commit('setInfo', response.data.info)
                } else {
                }

            } catch (e) {
                console.log('error', e)
            }
        },
    },
    namespaced: true
}