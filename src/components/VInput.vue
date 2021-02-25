<template lang="pug">
.customInput
    label.input(
        :class="{'isActive': is_active, 'hasError': hasError}"
    )
        input.input__inputTag(
            :value="value"
            @input="updateValue"
            :type="type"
            :required="required"
            @focus="focus"
            @blur="blur"
        )
        span.input__label(:class="{'isActive' : is_active }") {{label}}
        slot(name="icon")
    p.errorText {{error_text}}
</template>

<script>
export default {
    model: { event: 'input' },

    data () {
        return {
            hasFocus: false
        }
    },

    computed: {
        is_active () {
            return this.hasFocus || this.value !== ''
        },
        error_text () {
            return this.hasError ? this.errorText : ''
        }
    },

    props: {
        value: {
            type: [String, Number],
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        disabled: Boolean,

        hasError: Boolean,
        errorText: String
    },

    methods: {
        updateValue (el) {
            this.$emit('input', el.target.value)
        },
        focus () {
            this.hasFocus = true
            this.$emit('focus')
        },
        blur () {
            this.hasFocus = false
            this.$emit('blur')
        }
    }
}
</script>

<style lang="scss" scoped>

.customInput {

    .input {
        position: relative;
        display: flex;
        border: 1px solid $color_icon_gray;
        border-radius: 6px;

        font-size: 14px;
        line-height: 24px;

        transition: border-color 0.2s;

        &.isActive {
            border-color: $color_accent-green;
        }

        &.hasError {
            border-color: $color_error_red;
        }

        &__inputTag {
            width: 100%;
            outline: 0;
            padding: 13px 15px 15px 15px;
            min-height: 52px;
            border-width: 0;
            border-radius: 6px;

            // remove autofill background
                &:-webkit-autofill,
                &:-webkit-autofill:hover,
                &:-webkit-autofill:focus,
                &:-webkit-autofill:active  {
                    -webkit-box-shadow: 0 0 0 30px $color_white inset !important;
                }
        }

        &__label {
            position: absolute;
            top: 13px;
            left: 13px;
            padding: 0 2px;
            background: $color_white;

            font-size: inherit;
            line-height: inherit;
            color: darken(saturate(adjust-hue($color_icon_gray, -15), 0.93), 21.18);

            transition: top 0.2s, font-size 0.2s;

            &.isActive {
                top: -6px;
                font-size: 10px;
                line-height: 12px;
            }
        }
    }

    .errorText {
        margin-top: 5px;
        min-height: 14px;
        font-size: 10px;
        line-height: 14px;
        color: $color_error_red;
    }
}
</style>
