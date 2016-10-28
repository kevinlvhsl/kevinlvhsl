<template lang="jade">
.comm-head
    //- img.logo(class="logo" src="~assets/logo.png")
    img.headimg(src="~assets/headimg.jpg", :class="{round: isPlaying}", @click="changePlay")
    .welcom-p
        span(v-if="user", @click="loginOut") 登出
        span(v-if="!user", @click="goLoginIn") 登录
        strong(v-if="user") 你好 {{user.username}}
    audio(
        ref="myaudio",
        :src="url",
        autoplay
        loop
        @playing="isPlaying = true",
        @pause="isPlaying = false"
    )
        //- controls="controls"
</template>

<script>

const yueban = require('../assets/mp3/yueban.mp3')

export default {
    // props: ['user'],
    data () {
        return {
            msg: 'Welcome to kevin’ personal zone',
            url: yueban,
            isPlaying: true,
        }
    },
    methods: {
        changePlay () {
            if (this.$refs.myaudio.paused) {
                this.$refs.myaudio.play()
                this.isPlaying = true
            } else {
                this.$refs.myaudio.pause()
                this.isPlaying = false
            }
        },
        loginOut () {
            this.$emit('onloginOut')
            window.location.reload()
        },
        goLoginIn () {
            this.$router.push('login')
        }
    },
    computed: {
        user () {
            return this.$store.state.user || App.ss.get('user')
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.comm-head
    height: 80px
    position: fixed
    top: 0
    width: 100%
    background-color: lightblue
    h1
        padding: 0 140px
        line-height: 70px
        color: #575656
        overflow-x: hidden
        width: 700px
    .logo
        position: absolute
        top: 10px
        left: 20px
        height: 50px
        width: 50px
    audio
        height: 60px
        width: 360px
        margin-left: 100px
    .welcom-p
        position: absolute
        height: 40px
        width: 180px
        top: 50%
        margin-top: -20px
        left: 120px
        font-size: 18px
        color: #fff
        line-height: 40px
        font-weight: bold
        strong
            margin-left: 20px
        span
            cursor: pointer
            &:hover
                text-decoration: underline
    .headimg
        position: fixed
        top: 10px
        left: 20px
        z-index: 999
        height: 60px
        width: 60px
        border-radius: 100%
        border: 2px solid red
        animation: round 3s infinite linear
        // animation-name: round
        // animation-duration 3s
        // animation-iteration-count: infinite
        animation-play-state: paused
        &.round
            animation-play-state: running
        &:hover
            animation-play-state: paused !important
@keyframes round
    to
        transform: rotate(360deg)
</style>
