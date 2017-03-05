import AV from './db'

import App from '../common/app'

class Blog extends AV.Object {
    constructor () {
        super()
        this.name = 'Blog'
    }
    static getQuery () {
        return new AV.Query('Blog')
    }

    addOneBlog (obj, cb) {
        const blog = new Blog('Blog')
        blog.set('title', obj.title)
        blog.set('category', obj.category)
        blog.set('desc', obj.desc)
        blog.set('poster', obj.poster)
        blog.set('views', obj.views || 1)
        blog.set('type', obj.type)
        blog.set('content', obj.content)
        blog.set('date', Math.floor(Date.now() / 1000))

        blog.save().then((blog2) => {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + blog2.id)
            cb && cb(blog2)
        }, function (error) {
            // 失败之后执行其他逻辑
            console.log('Failed to create new object, with error message: ' + error.message)
        })
    }

    updateBlog (id, content, cb) {
        // 第一个参数是 className，第二个参数是 objectId
        const blog = AV.Object.createWithoutData('Blog', id)
        // 修改指定属性
        blog.set('content', content)
        blog.save().then((b) => {
            cb && cb(b)
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
    /**
     * 获取博客列表
     * @param  {obj}   params 参数（是否有排序等查询条件）
     */
    fetchList (params, cb, err) {
        const query = Blog.getQuery()
        // query.limit(10) // 最多返回 10 条结果
        // query.skip((page - 1) * 10)
        if (params.sort) {
            query.addDescending('views')
        }
        if (params.query) {
            query.equalTo('category', params.query)
        }
        query.addDescending('createdAt')   // 按创建时间降序
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
        }, (error) => {
            console.error(error)
        }).catch(() => {
            cb && cb([])
            err && err()
        })
    }
    /**
     * @param  {[type]}   id 对象的objectId
     * @param  {Function} cb 页面接口的回调
     */
    fetchItem (id, cb) {
        const query = Blog.getQuery()
        query.get(id).then((data) => {
            this.updateView(id, (v) => {
                data.attributes.views = v
                data.attributes.id = id
                cb && cb(data.attributes)
            })
        }, (error) => {
            // 异常处理
            console.log('获取Blog对象detail时报错了')
        })
    }

    updateView (id, cb) {
        const blog = AV.Object.createWithoutData('Blog', id)
        blog.save().then(function (bo) {
            bo.increment('views', 1)
            bo.fetchWhenSave(true)
            return bo.save()
        }).then(function (bo2) {
            console.log('最新次数', bo2.get('views'))
            cb && cb(bo2.get('views'))
            // 使用了 fetchWhenSave 选项，save 成功之后即可得到最新的 views 值
        }, function (error) {
            // 异常处理
        })
    }
}

AV.Object.register(Blog, 'Blog')
export default Blog
// https://leancloud.cn/docs/leanstorage-started-js.html#_1_用户注册和登录
