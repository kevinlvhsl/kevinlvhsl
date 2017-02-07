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
        bolg.set('category', obj.category)
        bolg.set('desc', obj.desc)
        bolg.set('poster', obj.poster)
        bolg.set('type', obj.type)
        bolg.set('date', Math.floor(Date.now() / 1000))

        bolg.save().then((blog2) => {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + blog2.id)
            cb && cb(blog2)
        }, function (error) {
            // 失败之后执行其他逻辑
            console.log('Failed to create new object, with error message: ' + error.message)
        })
    }

    static uploadFile (input, cb, err) {
        const localFile = input.files[0]
        const name = 'poster.jpg'

        const file = new AV.File(name, localFile)
        file.save().then((filed) => {
            // 文件保存成功
            console.log('上传后结果：', filed.url())
            cb && cb(filed.url())
        }, (error) => {
            // 异常处理
            console.error(error)
            err && err()
        })
    }

    fetchList (page, cb) {
        const query = Blog.getQuery()
        // query.limit(10) // 最多返回 10 条结果
        // query.skip((page - 1) * 10)
        query.find().then((data) => {
            const blogs = []
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
// '58130105da2f60005db1b87a'
    fetchItem (id, cb) {
        // const blog = AV.Object.createWithoutData('Blog', id)
        const query = Blog.getQuery('Blog')
        query.get(id).then((data) => {
            debugger
            console.log('data::', data)
            const title = blog.get('title') // 读取 title
            const content = blog.get('content') // 读取 content
            // return data.attributes
            cb && cb(data.attributes)
        }, (error) => {
                // 异常处理
        })
        // blog.fetch().then((data) => {
        //     console.log('data::', data)
        //     const title = blog.get('title') // 读取 title
        //     const content = blog.get('content') // 读取 content
        //     // return data.attributes
        //     cb && cb(data.attributes)
        // }, (error) => {
        //         // 异常处理
        // })
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
