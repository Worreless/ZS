<template lang="pug">

VInput.passwordInput(
    :value="value"
    @input="updateValue"
    :type="input_type"
    :hasError="hasError"
    :errorText="errorText"
    label='Пароль'
    :required="true"
    @focus="focus"
)
    template( v-slot:icon="")
        // TODO: import as svg, autoclean fill attribute and set hover/active styles
        img(:src="uploadIcon(icon_type)" @click="toggleInputType").passwordInput__icon
</template>

<script>
import VInput from '@/components/VInput'

export default {
    components: { VInput },

    data () {
        return {
            isPasswordVisible: false
        }
    },

    props: {
        value: {
            type: [String, Number],
            required: true
        },
        hasError: Boolean,
        errorText: String
    },

    computed: {
        input_type () {
            return this.isPasswordVisible ? 'text' : 'password'
        },
        icon_type () {
            return this.isPasswordVisible ? 'icon-password-hide' : 'icon-password-show'
        }
    },

    methods: {
        toggleInputType () {
            this.isPasswordVisible = !this.isPasswordVisible
        },
        updateValue (value) {
            this.$emit('input', value)
        },
        focus () {
            this.$emit('focus')
        },
        uploadIcon (name) {
            return require(`@/assets/icons/${name}.svg`)
        }
    }
}
</script>

<style lang="scss" scoped>
.passwordInput {
    &__icon {
        cursor: pointer;
        width: 24px;
        height: 24px;
        margin: auto 14px auto 2px;
    }
}
</style>
