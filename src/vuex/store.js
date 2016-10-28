import Vue from 'vue'

import Vuex from 'vuex'

import userApi from '../api/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: '',
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
                dispatch('updateUser', { user })
                App.ss.set('user', user)
                cb && cb()
            })
        },
        updateUser ({ commit, dispatch, state }, { user }) {
            // debugger
            commit('setUser', { user })
        }
    },
    mutations: {
        setUser (state, { user }) {
            state.user = user
        }
    },
    getters: {
        getUser (state) {
            return state.user
        }
    }
})

export default store