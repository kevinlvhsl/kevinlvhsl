import Vue from 'vue'
import App from './common/app'
import app from './App.vue'

// require('./common/zepto.js')
import router from './config/router'

import store from './vuex/store'


window.App = App

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')

/* eslint-disable no-new */

// 各种浏览器兼容
let visibilityChange
if (typeof document.hidden !== 'undefined') {
    visibilityChange = 'visibilitychange'
} else if (typeof document.mozHidden !== 'undefined') {
    visibilityChange = 'mozvisibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange'
}
// 添加监听器，在title里显示状态变化
document.addEventListener(visibilityChange, function() {
    if (document.hidden) {
        document.title = '哇塞！这里有新奇'
    } else {
        document.title = 'kevin大叔的个人网站'
    }
}, false)
