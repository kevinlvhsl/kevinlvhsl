<template lang="jade">
.side-nav(:class="{show: isShow}")
    el-menu.el-menu-vertical-demo(:default-active="currentRoute")
        router-link(to="/index")
            el-menu-item(index="index")
                i.el-icon-menu  HOME
        router-link(to="about")
            el-menu-item(index="about")
                i.el-icon-menu  ABOUT ME
        router-link(to="blogs")
            el-menu-item(index="blogs")
                i.el-icon-menu  BLOG
        router-link(to="login", v-if="!logined")
            el-menu-item(index="login")
                i.el-icon-menu  LOGIN
        router-link(to="signUp", v-if="!logined")
            el-menu-item(index="signUp")
                i.el-icon-menu  SIGNUP
        router-link(to="detail", index="detail")
</template>
<script>

export default {
    name: 'nav',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        changeStatus: {
            type: Function,
        },
        user: {
            type: Object
        }
    },
    components: {
    },
    data () {
        return {
            logined: this.user
        }
    },
    computed: {
        currentRoute () {
            if (this.$route.path.split('/')[1] === 'detail') return ''
            return this.$route.path.split('/')[1]
        }
    },
    mounted () {
    }
}

</script>
<style lang="sass">
@import '../sass/main.sass'
.side-nav
    position: fixed
    background-color: #f8f8f8
    z-index: 99
    height: calc(100% - 80px)
    width: 160px
    top: 80px
    right: 0px
    transition: all .6s
    transform: translateX(100%)
    &.show
        transform: translateX(0)

    .nav-list
        line-height: 50px
        li
            text-indent: 6px
            font-size: 24px
            &:hover,
            &.cur
                background-color: lightblue
</style>