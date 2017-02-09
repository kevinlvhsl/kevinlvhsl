/**
 * Api 文档
 * url: https://https://leancloud.cn/docs/rest_api.html
 */
import Vue from 'vue'

import VueResource from '../../node_modules/vue-resource'


const host = 'https://api.leancloud.cn/1.1/'
const yhwxUrl = 'http://mp.weixin.qq.com/s?__biz=MzIyMTIwNDg3MQ==&mid=402529106&idx=1&sn=4b1b434eee5a23dec415ac10f792a893#rd'
Vue.use(VueResource)


Vue.http.options.crossOrigin = true
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.timeout = 15000
Vue.http.options.cache = false

Vue.http.interceptors.push((request, next) => {
    // if (request.params.hideLoading) {
    //   delete request.params.hideLoading
    // } else {
    //   App._startloadingTime = new Date().getTime()
    //   App.showLoading()
    // }

    // const urlOpenid = App.queryHref('openid')
    // if (App.isLocal || urlOpenid) {
    //   const debugOpenid = 'o9lXxw8FHwukQQm2vuwlth9wDP2I' // dd的openid
    //   // const debugOpenid = 'o9lXxw6Ocj6SaRMdRpuPl-OKWhPc' // 张瓒的openid
    //   // const debugOpenid = 'o9lXxw6Ocj6SaRMdRpuPl-OKWhPc' // 三星S4的openid
    //   // const debugOpenid = 'o9lXxwzsaKUVdr_-UoBy9u5mxNjY' // 小佳的openid

    //   request.params.mode = 'DEBUG'
    //   request.params.openid = urlOpenid || debugOpenid
    // }

    next((response) => {
        // const status = parseInt(response.status)

        // if (status === 401) {
        //   // 未授权
        //   if (App.isIos) {
        //     window.location.href = `${response.data.loginurl}?url=${location.href}`
        //   } else {
        //     setTimeout(() => {
        //       window.location.href = `${response.data.loginurl}?url=${location.href}`
        //     }, 10)
        //   }
        // } else if (status === 403) {
        //   // 未关注公众号
        //   if (App.isIos) {
        //     window.location.href = yhwxUrl
        //   } else {
        //     setTimeout(() => { window.location.href = yhwxUrl }, 10)
        //   }
        // } else if (status === 409) {
        //   // 用户已提交申请
        //   App.go('/error/409')
        // } else if (status === 410) {
        //   // 用户和设备未绑定
        //   App.go('/error/410')
        // } else if (status === 460) {
        //   App.pop('请在联系人信息中绑定手机号码')
        // } else if (status !== 200) {
        //   App.pop()
        // }

        // const minRequestTime = 400
        // const requestTime = new Date().getTime() - App._startloadingTime
        // if (requestTime < minRequestTime) {
        //   setTimeout(() => {
        //     App.hideLoading()
        //   }, minRequestTime - requestTime)
        // } else {
        //   App.hideLoading()
        // }
        // App._startloadingTime = new Date().getTime()
    })
})

// const accessToken = getCookie('access_token')
// if (accessToken) Vue.http.headers.common['Authorization'] = `WEIXIN ${accessToken}`

export const baseResource = Vue.resource(`${host}{/uri}`)
export const deviceUserResource = Vue.resource(`${host}/users{/userId}`)
export const dataResource = Vue.resource(`${host}/users{/userId}{/uri}{/uriId}`)
export const remindersResource = Vue.resource(`${host}/devices{/deviceId}/reminders`)
export const remindResource = Vue.resource(`${host}/devices{/deviceId}/reminders{/reminderId}`)

export const contactResource = Vue.resource(`${host}/devices{/deviceId}/contacts{/contactId}`, {}, {
    patchContact: { method: 'PATCH', url: `${host}/devices{/deviceId}/contacts{/contactId}` },
})

export const devicesResource = Vue.resource(`${host}/devices{/deviceId}{/uri}`, {}, {
    post: { method: 'POST', url: `${host}/devices{/deviceId}{/uri}` },
    patchDevice: { method: 'PATCH', url: `${host}/devices{/deviceId}` },
    ratifyBindRequests: { method: 'PATCH', url: `${host}/devices{/deviceId}/bindrequests/{/reqId}` },
    deleteBindRequests: { method: 'DELETE', url: `${host}/devices{/deviceId}/bindrequests/{/reqId}` },
    findDevice: { method: 'POST', url: `${host}/devices{/deviceId}/find` },
    poweroffDevice: { method: 'POST', url: `${host}/devices{/deviceId}/poweroff` },
    monitorDevice: { method: 'POST', url: `${host}/devices{/deviceId}/monitor` },
})

export const messageResource = Vue.resource(`${host}/messages{/messagesId}{/uri}`, {}, {
    post: { method: 'POST', url: `${host}/messages{/messagesId}{/uri}` },
})
