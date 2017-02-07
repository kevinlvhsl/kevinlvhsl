import Vue from 'vue'

import Vuex from 'vuex'

import userApi from '../api/user'

import BlogApi from '../api/blog'

import App from '../common/app'

const blogApi = new BlogApi()
// blogApi.fetchItem()
// blogApi.fetchList((s) => {
//     console.log('获取回来的数据：：', s)
// })

// const blogs = [
//     {
//         id: 1,
//         date: 1477203378,
//         title: 'css实现打字效果',
//         desc: '这里主要用的技术是css的steps动画函数来实现。。。这里主要用的技术是css的steps动画函这里主要用的技术是css的steps动画函'
//     },
//     {
//         id: 2,
//         date: 1477353000,
//         title: 'css实现打字效果1',
//         desc: '这里主要用的技术是css的steps动画函数来实现。。。'
//     },
//     {
//         id: 3,
//         date: 1477523378,
//         title: 'css实现打字效果2',
//         desc: '这里主要用的技术是css的steps动画函数来实现。。。'
//     }
// ]
// blogs.forEach((item) => {
//     blogApi.addOneBlog(item)
// })
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
        fetchBlogs ({ commit, state }, page = 1) {
            blogApi.fetchList(page, (s) => {
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
            blogApi.fetchItem(params, (blog) => {
                console.log('获取单个blog：', blog)
                cb && cb(blog)
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
