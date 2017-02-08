<template lang="jade">
.comm-head(v-show="currentRoute")
    img.headimg(src="~assets/headimg.jpg", :class="{round: isPlaying}", @click="changePlay")
    router-link.logo-box(to="/index")
        img(class="logo" src="~assets/logo.png")
        p 篮球-星翼空间
    .welcome(v-if="user")
        strong {{user.username}} &nbsp;
        a(v-if="user", @click="loginOut") 注销
        //- 登录需要手动输入url
         //-     span(v-if="!user", @click="goLoginIn") 登录
    //- el-menu(class="app-nav", :default-active="currentRoute", router=true, class="el-menu-demo", mode="horizontal" @select="handleSelect")
    //-     el-menu-item(index="index") 首页
    //-     el-menu-item(index="blogs") BLOG
    //-     el-menu-item(index="about") ABOUT ME
    //-     el-menu-item(v-if="user" index="admin") 管理后台
    el-menu(class="app-nav", default-active="index", mode="horizontal")
        router-link(to="/index")
            el-menu-item(index="index") HOME
        router-link(to="about")
            el-menu-item(index="about") ABOUT ME
        router-link(to="blogs")
            el-menu-item(index="blogs") BLOG
        router-link(to="admin", v-if="user")
            el-menu-item(index="admin") ADMIN
        router-link(to="detail", index="detail")
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
    name: 'nav',
    data () {
        return {
            msg: 'Welcome to kevin’ personal zone',
            url: yueban,
            isPlaying: true,
            user: this.user
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
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        },
        currentRoute () {
            if (this.$route.path.split('/')[1] === 'detail') return ''
            return this.$route.path.split('/')[1]
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
$themeBlue: #20a0ff
.comm-head
    height: 60px
    min-width: 1000px
    position: fixed
    display: flex
    top: 0
    width: 100%
    padding-left: 100px
    background-color: #fff
    border-top: 3px solid lightblue
    box-shadow: 0 5px 5px rgba(0, 0, 0, .4)
    h1
        padding: 0 140px
        line-height: 70px
        color: #575656
        overflow-x: hidden
        width: 700px
    .logo-box
        display: flex
        width: 200px
        align-items: center
        font-size: 20px
        color: #1d90e6
        .logo
            height: 48px
            width: 48px
    audio
        height: 60px
        width: 360px
        margin-left: 100px
    .welcome
        width: 150px
        height: 100%
        line-height: 60px
        font-size: 16px
        color: #000
        font-weight: bold
        a
            cursor: pointer
            &:hover
                text-decoration: underline
    .app-nav
        flex: 1
        .el-menu-item
            font-size: large
            &:hover
                background-color: $themeBlue
                color: #fff


    .headimg
        position: fixed
        top: 7px
        left: 20px
        z-index: 999
        height: 48px
        width: 48px
        border-radius: 100%
        border: 2px solid lightblue
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
