<template lang="pug">
    h1.title Заказы
</template>

<script>
import $axios from '@/plugins/axios'
export default {
    async created () {
        const resp = await $axios({
            method: 'get',
            url: 'https://zonesmart.su/api/v1/zonesmart/order/',
            params: {
                limit: 10,
                offset: 0,
                search: ''
            }
        })

        console.log({ resp })
    }
}
</script>
