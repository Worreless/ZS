<template lang="pug">
button.button(
    :type="type",
    :disabled="disabled",
)
    slot
</template>

<script>
export default {
    props: {
        type: String,
        disabled: Boolean
    }
}
</script>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    width: 100%;
    height: 52px;
    border: 0;
    outline: 0;

    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;

    color: $color_white;

    background: $color_accent-green;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover, &:active {
        background: darken(saturate($color_accent-green, 14.33), 10.00);
    }

    &:disabled {
        cursor: initial;
        background: $color_icon_gray;
    }
}
</style>
