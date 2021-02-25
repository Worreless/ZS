import $axios from '@/plugins/axios'

export default {
    state: {
        accessToken: null,
        refreshToken: null
    },
    getters: {
        is_logged: (state) => state.accessToken !== null
    },
    mutations: {
        CHANGE_TOKENS (state, { accessToken, refreshToken }) {
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        },
        UPDATE_REFRESH_TOKEN (state, { refreshToken }) {
            state.refreshToken = refreshToken
        },
        CLEAR_TOKENS (state) {
            state.accessToken = null
            state.refreshToken = null
        }
    },
    actions: {
        async login ({ commit }, { email, password }) {
            const resp = await $axios({
                method: 'post',
                url: 'https://zonesmart.su/api/v1/auth/jwt/create/',
                data: { email, password }
            })

            commit('CHANGE_TOKENS', {
                accessToken: resp.data.access,
                refreshToken: resp.data.refresh
            })
        },

        async refreshToken ({ state, commit }) {
            const refresh = state.refreshToken
            const resp = await $axios({
                method: 'post',
                url: 'https://zonesmart.su/api/v1/auth/jwt/refresh/',
                data: { refresh }
            })

            commit('UPDATE_REFRESH_TOKEN', {
                refreshToken: resp.data.refresh
            })
        }
    },
    namespaced: true
}
