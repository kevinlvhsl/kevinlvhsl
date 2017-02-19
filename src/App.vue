<template lang="jade">
#app
    transition(name="fade" mode="out-in")
        router-view.view(@onloginIn="loginIn", @onloginOut="loginOut", v-loading.fullscreen.lock="loading", element-loading-text="加载中")
    comm-head(@onloginOut="loginOut", :user="user")
    .loading-ball(v-show="loading")
        em
    //- side-switch(:is-show="isShow", :changeStatus="changeStatus")
    //- side-nav(:is-show="isShow", :changeStatus="changeStatus", :user="user")
</template>

<script>

import Vue from 'vue'

import VueMarkdown from 'vue-markdown'

import CommHead from './components/commhead.vue'

import SideSwitch from './components/sideSwitch.vue'

import sideNav from './components/sideNav.vue'

import Element from '../node_modules/element-ui'

import '../node_modules/element-ui/lib/theme-default/index.css'

Vue.use(Element)
Vue.component('vue-markdown', VueMarkdown)

export default {
    name: 'App',
    components: {
        CommHead,
        SideSwitch,
        sideNav
    },
    data () {
        return {
            isShow: true
        }
    },
    methods: {
        changeStatus () {
            console.log('改变状态')
            this.isShow = !this.isShow
        },
        loginIn () {
            this.user = App.ss.get('user')
            this.$store.dispatch('updateUser', App.ss.get('user'))
        },
        loginOut () {
            this.$store.dispatch('updateUser', { user: null })
            App.ss.set('user', null)
        }
    },
    computed: {
        user () {
            return this.$store.state.user || App.ss.get('user')
        },
        loading () {
            return !!this.$store.state.loading
        }
    },
    mounted () {
        this.$router.beforeEach((route, redirect, next) => {
            this.isShow = false
            next()
        })
        console.log('session中的user：：', App.ss.get('user'))
        if (App.ss.get('user')) {
            this.$store.dispatch('updateUser', { user: App.ss.get('user') })
        }
        App.showLoading = () => {
            this.$store.commit('changeLoading', 1)
        }
        App.hideLoading = () => {
            this.$store.commit('changeLoading', 0)
        }
    }
}
</script>

