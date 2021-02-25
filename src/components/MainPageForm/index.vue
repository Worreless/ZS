<template lang="pug">
.forms
    MainPageFormLogin
</template>

<script>
import MainPageFormLogin from './MainPageFormLogin'

export default {
    components: { MainPageFormLogin }
}
</script>

<style lang="scss" scoped>
.forms {
    background: $color_white;
    box-shadow: 0px 14px 64px rgba(48, 56, 64, 0.16);
    border-radius: 6px;
    width: 100%;
    max-width: 407px;
    padding: 40px 50px;
}
</style>
