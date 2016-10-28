<template lang="jade">
.left-panel
    .header
        .avatar
            //- img(src="~assets/headimg.jpg", :class="{round: isPlaying}")
        .description
            | 这里是我的座右铭 {{msg}}
    .main-main-content
        .audio-box
            //- audio(ref="myaudio", :src="url")

</template>
<script>

export default {
    data () {
        return {
            msg: 'Welcome to kevin’ personal zone'
        }
    },
    computed: {

    },
    mounted () {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.left-panel
    width: 100%
    min-width: 280px
    height: 100%
    background-color: lightblue
    display: flex
    flex-direction: column
    align-items: stretch
    .header
        height: 240px
        width: 100%
        text-align: center
        .avatar
            height: 100px
            width: 100px
            margin: 10px auto
            border-radius: 50%
            overflow: hidden
            img
                height: 100%
                width: 100%
                border-radius: 50%
                animation: round 3s infinite linear
                // animation-name: round
                // animation-duration 3s
                // animation-iteration-count: infinite
                animation-play-state: paused
                &.round
                    animation-play-state: running
                &:hover
                    animation-play-state: paused !important
        .description
            margin: 10px
            font-size: 16px
    .main-content
        flex: 1
        .audio-box
            width: 280px
            border: 2px solid blue
            margin: 20px auto
        #audiojs_wrapper0.audiojs
            border: 1px solid red
            width: 280px !important
            .scrubber
                width: 120px
@keyframes round
    to
        transform: rotate(360deg)
</style>
