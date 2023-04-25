/* eslint-disable */
import axios from "axios";

import {baseConfig} from "@/store/config";

export const infoModule = {
    state: () => ({

        profileInfoRequest: {
            token: '',
            type: ''
        },

        profileInfo: {

        },


    }),

    getters: {},
    mutations: {
        setProfileInfo(state, data) {
            state.profileInfo = data
        },

    },

    actions: {

        async getProfileInfoRequest({state, commit}) {
            try {

                const response = await axios.post(baseConfig.BASE_URL + 'patient_info/', state.profileInfoRequest,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                if (response.data.status == 'ok') {
                    commit('setProfileInfo', response.data.info)
                } else {
                }

            } catch (e) {
                console.log('error', e)
            }
        },
    },
    namespaced: true
}