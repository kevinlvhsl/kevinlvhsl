import AV from './db'

import App from '../common/app'

export default class Blog extends AV.Object {
    // constractor(){
    //     super()
    // }
    static getQuery () {
        return new AV.Query(this.name)
    }

    addOneBlog (obj, cb) {
        const bolg = new Blog()
        bolg.set('title', obj.title)
        bolg.set('content', obj.content)
        bolg.set('desc', obj.desc)
        bolg.set('img', obj.img)
        bolg.set('date', Math.floor(Date.now() / 1000))

        bolg.save().then(function (blog) {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + blog.id)
            alert('seccess' + obj.id + '')
            cb && cb(blog)
        }, function (error) {
            // 失败之后执行其他逻辑
            console.log('Failed to create new object, with error message: ' + error.message)
        })
    }

    fetchList (cb) {
        Blog.getQuery().find().then((data) => {
            const blogs = []
            debugger
            data.forEach((b) => {
                blogs.push(b.attributes)
            })
            console.log('blogs::', blogs)
            cb && cb(blogs)
        }, (err) => {
            console.error(err)
        })
        // var query = new AV.Query('Todo');
        //   query.get('57328ca079bc44005c2472d0').then(function (todo) {
        //     // 成功获得实例
        //     // data 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
        //   }, function (error) {
        //     // 异常处理
        //   });
    }

    fetchItem (id) {
        const blog = AV.Object.createWithoutData('Blog', '58130105da2f60005db1b87a')
        console.log('onblog', blog)
        blog.fetch().then((data) => {
            console.log('data::', data)
            const title = blog.get('title') // 读取 title
            const content = blog.get('content') // 读取 content
            return data.attributes
        }, (error) => {
                // 异常处理
        })
    }
}

AV.Object.register(Blog)

// export default {
//     fetchBlogs (params, cb) {
//         const blogs = [
//                 {
//                     id: 1,
//                     date: 1477203378,
//                     title: 'css实现打字效果',
//                     desc: '这里主要用的技术是css的steps动画函数来实现。。。这里主要用的技术是css的steps动画函这里主要用的技术是css的steps动画函'
//                 },
//                 {
//                     id: 2,
//                     date: 1477353000,
//                     title: 'css实现打字效果1',
//                     desc: '这里主要用的技术是css的steps动画函数来实现。。。'
//                 },
//                 {
//                     id: 3,
//                     date: 1477523378,
//                     title: 'css实现打字效果2',
//                     desc: '这里主要用的技术是css的steps动画函数来实现。。。'
//                 }
//             ]
//         user.setUsername(params.userName)
//         user.setPassword(params.password)
//         user.setEmail(params.email)
//         user.signUp().then((loginedUser) => {
//             cb && cb(loginedUser)
//         }, ((error) => {
//             App.pop(JSON.stringify(error))
//         }))
//     },
//     fetchItem (params, cb) {
//         AV.User.logIn(params.userName, params.password).then((loginedUser) => {
//             // App.ss.set('user', loginedUser)
//             // App.user = loginedUser
//             // cb && cb(App.user)
//             cb && cb(loginedUser)
//         }, ((error) => {
//             App.pop(JSON.stringify(error))
//         }))
//     }
// }


// https://leancloud.cn/docs/leanstorage-started-js.html#_1_用户注册和登录