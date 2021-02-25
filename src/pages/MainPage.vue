<template lang="pug">
.MainPage
    MainPageForm.loginForm
</template>

<script>
import MainPageForm from '@/components/MainPageForm'

export default {
    components: { MainPageForm }
}
</script>

<style lang="scss" scoped>
.MainPage {
    display: flex;
    flex-grow: 1;

    .loginForm {
        margin: auto;
    }
}
</style>
