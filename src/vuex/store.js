import Vue from 'vue'

import Vuex from 'vuex'

import userApi from '../api/user'

import BlogApi from '../api/blog'

import App from '../common/app'

const blogApi = new BlogApi()

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: App.ss.get('user') || '',
        blogs: []
    },
    actions: {
        register ({ dispatch, state }, { params, cb }) {
            userApi.signUp(params, (user) => {
                // 注册成功，保存session
                App.ss.set('user', user)
                dispatch('updateUser', { user })
                cb && cb()
            })
        },
        loginIn ({ dispatch, state }, { params, cb }) {
            userApi.signIn(params, (user) => {
                // 登录成功，保存session
                App.ss.set('user', user)
                dispatch('updateUser', { user })
                cb && cb()
            })
        },
        fetchBlogs ({ commit, state }, params) {
            blogApi.fetchList(params, (s) => {
                console.log('获取回来的数据：：', s)
                commit('initBlogs', { items: s })
            })
        },
        updateUser ({ commit, dispatch, state }, { user }) {
            commit('setUser', { user })
        },
        saveBlog ({ dispatch, state }, { params, cb }) {
            blogApi.addOneBlog(params, (s) => {
                console.log('成功的数据：：', s)
                cb && cb()
            })
        },
        getBlogItem ({ commit, dispatch, state }, { params, cb }) {
            blogApi.fetchItem(params, cb)
        }
    },
    mutations: {
        setUser (state, { user }) {
            console.log('设置user：：', user)
            state.user = user
            Vue.set(state, 'user', user)
            console.log('state.user:::', state.user)
        },
        initBlogs (state, { items }) {
            state.blogs = items
        }
    },
    getters: {
        getUser (state) {
            return state.user
        }
    },
    middlewares: {
      // onMutation (mutation, { setClock }) {
      //   // if (mutation.type === 'initBlogs') {
      //   //     App.ls.set('packages', service.packages)
      //   //     console.log('ls set packages ')
      //   // }
      // }
    }
})

export default store
