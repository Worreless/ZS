import axios from 'axios'
import store from '@/store'
import router from '@/router'

const ignoredRefreshUrls = [
    'https://zonesmart.su/api/v1/auth/jwt/create/',
    'https://zonesmart.su/api/v1/auth/jwt/refresh/'
]

axios.interceptors.request.use(
    config => {
        const token = store.state.auth.accessToken
        if (token) {
            config.headers.Authorization = `JWT ${token}`
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 &&
        ignoredRefreshUrls.includes(originalRequest.url)) {
        return Promise.reject(error)
    }

    if (error.response.status === 401 &&
        originalRequest._retry !== true) {
        originalRequest._retry = true
        store.dispatch('auth/refreshToken')
            .then(() => {
                return axios(originalRequest)
            })
            .catch(() => {
                store.commit('CLEAR_TOKENS')
                router.push('/')
            })
    }
    return Promise.reject(error)
})

export default axios
