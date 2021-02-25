import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth
    },
    plugins: [
        PersistedState({
            paths: [
                'auth.accessToken',
                'auth.refreshToken'
            ]
        })
    ]
})

export default store
