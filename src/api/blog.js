import AV from './db'

import App from '../common/app'

export default class Blog extends AV.Object {

    static getQuery () {
        return new AV.Query('Blog')
    }

    addOneBlog (obj, cb) {
        const bolg = new Blog()
        bolg.set('title', obj.title)
        bolg.set('category', obj.category)
        bolg.set('desc', obj.desc)
        bolg.set('poster', obj.poster)
        bolg.set('type', obj.type)
        bolg.set('content', obj.content)
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
            if (data && data.length > 0) {
                data.forEach((b) => {
                    const obj = b.attributes || {}
                    obj.id = b.id
                    blogs.push(obj)
                })
                console.log('blogs::', blogs)
            }
            cb && cb(blogs)
        }, (err) => {
            console.error(err)
        })
    }
    /**
     * @param  {[type]}   id 对象的objectId
     * @param  {Function} cb 页面接口的回调
     */
    fetchItem (id, cb) {
        const query = Blog.getQuery()
        query.get(id).then((data) => {
            console.log('data::', data)
            cb && cb(data.attributes)
        }, (error) => {
            // 异常处理
            console.log('获取Blog对象detail时报错了')
        })
    }
}

AV.Object.register(Blog)

// https://leancloud.cn/docs/leanstorage-started-js.html#_1_用户注册和登录
