<template lang="pug">
#app
    router-view
</template>

<style lang="scss">
@import "styles/global";

#app {
    display: flex;
    flex-direction: column;
    background: $color_background_gray;
    min-height: 100vh;
}
</style>
