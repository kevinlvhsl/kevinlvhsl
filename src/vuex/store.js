import Vue from 'vue'

import Vuex from 'vuex'

import userApi from '../api/user'

import BlogApi from '../api/blog'
import GameLogApi from '../api/gameLog'

import App from '../common/app'

const blogApi = new BlogApi()
const gameLogApi = new GameLogApi()

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: App.ss.get('user') || '',
        blogs: [],
        loading: 0
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
            commit('changeLoading', 1)
            blogApi.fetchList(params, (s) => {
                console.log('获取回来的数据：：', s)
                commit('initBlogs', { items: s })
                commit('changeLoading', 0)
            }, () => {
                alert('网络不给力， 请稍后再试')
                commit('changeLoading', 0)
            })
        },
        updateUser ({ commit, state }, { user }) {
            commit('setUser', { user })
        },
        saveBlog ({ commit, state }, { params, cb }) {
            commit('changeLoading', 1)
            blogApi.addOneBlog(params, (s) => {
                console.log('成功的数据：：', s)
                commit('changeLoading', 0)
                cb && cb()
            })
        },
        saveGameLog({ commit, state }, { data, cb }) {
            gameLogApi.addOneLog(data, cb)
        },
        updateBlog ({ commit, state }, { id, content, cb }) {
            commit('changeLoading', 1)
            blogApi.updateBlog(id, content, () => {
                cb && cb()
                commit('changeLoading', 0)
            })
        },
        getBlogItem ({ commit, state }, { params, cb }) {
            commit('changeLoading', 1)
            blogApi.fetchItem(params, (b) => {
                cb && cb(b)
                commit('changeLoading', 0)
            })
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
        },
        // 直接修改咯定状态
        changeLoading (state, st) {
            state.loading = st
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
