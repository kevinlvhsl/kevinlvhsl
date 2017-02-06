<template lang="jade">
#app
    transition(name="fade" mode="out-in")
        router-view.view(@onloginIn="loginIn", @onloginOut="loginOut")
    comm-head(@onloginOut="loginOut", :user="user")
    //- side-switch(:is-show="isShow", :changeStatus="changeStatus")
    //- side-nav(:is-show="isShow", :changeStatus="changeStatus", :user="user")
</template>

<script>

import Vue from 'vue'

import CommHead from './components/commhead.vue'

import SideSwitch from './components/sideSwitch.vue'

import sideNav from './components/sideNav.vue'

import Element from '../node_modules/element-ui'

import '../node_modules/element-ui/lib/theme-default/index.css'

// window.el = Element
// console.log(Element)
Vue.use(Element)

// import Button from 'element-ui/lib/button'
// import Menu from 'element-ui/lib/menu'
// import MenuItem from 'element-ui/lib/menu-item'
// import Row from 'element-ui/lib/row'
// import Col from 'element-ui/lib/col'
// Vue.component(Button.name, Button)
// Vue.component(Menu.name, Menu)
// Vue.component(MenuItem.name, MenuItem)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)


export default {
    name: 'App',
    components: {
        CommHead,
        SideSwitch,
        sideNav
    },
    data () {
        return {
            isShow: true,
            user: this.$store.state.user || App.ss.get('user')
        }
    },
    methods: {
        changeStatus () {
            console.log('改变状态')
            this.isShow = !this.isShow
        },
        loginIn () {
            this.user = App.ss.get('user')
            // this.$store.dispatch('updateUser', App.ss.get('user'))
        },
        loginOut () {
            this.$store.dispatch('updateUser', { user: null })
            App.ss.set('user', null)
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
    }
}
</script>

