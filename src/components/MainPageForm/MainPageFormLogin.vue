<template lang="pug">
form.loginForm(
    @submit.prevent="onSubmit"
)
    h2.formTitle.title Вход

    VInput.input(
        v-model="login"
        :hasError="hasError"
        label='Логин'
        type="text"
        :required="true"
        @focus="resetErrors"
    )
    MainPageFormLoginInputPassword.input(
        v-model="password"
        :hasError="hasError"
        :errorText="errorText"
        @focus="resetErrors"
    )

    VButton(type="submit") Войти
</template>

const messages = {
    incorrect_credentials: 'Введены неверные данные.',
    server_error: 'Ошибка на сервере. Повторите запрос позже.'
}

<script>
import VInput from '@/components/VInput'
import VButton from '@/components/VButton'
import MainPageFormLoginInputPassword from './MainPageFormLoginInputPassword'

export default {
    components: { VInput, VButton, MainPageFormLoginInputPassword },

    data () {
        return {
            login: '',
            password: '',
            hasError: false,
            errorText: ''
        }
    },

    methods: {
        onSubmit () {
            console.log('Form Sended')
        },
        resetErrors () {
            this.hasError = false
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
