import AV from '../server/index'

import App from '../common/app'

export default {
    signUp (params, cb) {
        const user = new AV.User()
        user.setUsername(params.userName)
        user.setPassword(params.password)
        user.setEmail(params.email)
        user.signUp().then((loginedUser) => {
            cb && cb(loginedUser)
        }, ((error) => {
            App.pop(JSON.stringify(error))
        }))
    },
    signIn (params, cb) {
        AV.User.logIn(params.userName, params.password).then((loginedUser) => {
            // App.ss.set('user', loginedUser)
            // App.user = loginedUser
            // cb && cb(App.user)
            cb && cb(loginedUser)
        }, ((error) => {
            App.pop(JSON.stringify(error))
        }))
    }
}
// AV.User.register(KUser)

// https://leancloud.cn/docs/leanstorage-started-js.html#_1_用户注册和登录