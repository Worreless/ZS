<template lang="pug">
form.loginForm(
    @submit.prevent="onSubmit"
)
    h2.formTitle.title Вход

    VInput.input(
        v-model="email"
        :hasError="has_error"
        label='E-mail или телефон'
        type="text"
        :required="true"
        @focus="resetErrors"
    )
    MainPageFormLoginInputPassword.input(
        v-model="password"
        :hasError="has_error"
        :errorText="errorText"
        @focus="resetErrors"
    )

    VButton(type="submit" :disabled="is_button_disabled") Войти
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VInput from '@/components/VInput'
import VButton from '@/components/VButton'
import MainPageFormLoginInputPassword from './MainPageFormLoginInputPassword'

const ERROR_MESSAGES_LIST = {
    incorrect_credentials: 'Введены неверные данные.',
    server_error: 'Ошибка на сервере. Повторите запрос позже.'
}
const REQUEST_STATUS_LIST = {
    error: 'error',
    loading: 'loading',
    inactive: 'inactive'
}

export default {
    components: { VInput, VButton, MainPageFormLoginInputPassword },

    data () {
        return {
            email: '',
            password: '',
            errorText: '',
            requestStatus: REQUEST_STATUS_LIST.inactive
        }
    },

    computed: {
        ...mapGetters('auth', [
            'is_logged'
        ]),
        has_error () {
            return this.requestStatus === REQUEST_STATUS_LIST.error
        },
        is_button_disabled () {
            return this.requestStatus === REQUEST_STATUS_LIST.loading
        }
    },

    created () {
        if (this.is_logged) {
            this.$router.push('/orders')
        }
    },

    methods: {
        ...mapActions('auth', [
            'login'
        ]),
        async onSubmit () {
            try {
                this.requestStatus = REQUEST_STATUS_LIST.loading

                await this.login({
                    email: this.email,
                    password: this.password
                })

                this.$router.push('/orders')

                this.requestStatus = REQUEST_STATUS_LIST.inactive
            } catch (error) {
                this.requestStatus = REQUEST_STATUS_LIST.error

                const errorCode = error.response?.status

                switch (errorCode) {
                case 401:
                    this.errorText = ERROR_MESSAGES_LIST.incorrect_credentials
                    break

                default:
                    this.errorText = ERROR_MESSAGES_LIST.server_error
                    break
                }
            }
        },
        resetErrors () {
            this.requestStatus = REQUEST_STATUS_LIST.inactive
            this.errorText = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.loginForm {
    .title {
        text-align: center;
        margin-bottom: 40px;
    }

    .input {
        margin-bottom: 17px;
    }
}
</style>
