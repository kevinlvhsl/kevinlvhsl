import AV from './db'

import App from '../common/app'

class GameLog extends AV.Object {
    constructor () {
        super()
        this.name = 'GameLog'
    }
    static getQuery () {
        return new AV.Query('GameLog')
    }
    // 插入一条记录
    addOneLog (obj, cb) {
        const log = new GameLog()
        log.set('name', obj.name)
        log.set('times', obj.times)
        log.set('date', Math.floor(Date.now() / 1000))

        log.save().then((gameLog) => {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + gameLog.id)
            cb && cb(gameLog)
        }, function (error) {
            // 失败之后执行其他逻辑
            console.log('Failed to create new object, with error message: ' + error.message)
        })
    }


    /**
     * 获取博客列表
     * @param  {obj}   params 参数（是否有排序等查询条件）
     */
    fetchList (params, cb, err) {
        const query = GameLog.getQuery()
        // query.limit(10) // 最多返回 10 条结果
        // query.skip((page - 1) * 10)

        query.addDescending('times')   // 按创建时间降序
        query.find().then((data) => {
            const gameLogs = []
            if (data && data.length > 0) {
                data.forEach((b) => {
                    const obj = b.attributes || {}
                    obj.id = b.id
                    gameLogs.push(obj)
                })
                console.log('gameLogs::', gameLogs)
            }
            cb && cb(gameLogs)
        }, (error) => {
            console.error(error)
        }).catch(() => {
            cb && cb([])
            err && err()
        })
    }

}

AV.Object.register(GameLog, 'GameLog')
export default GameLog
// https://leancloud.cn/docs/leanstorage-started-js.html#_1_用户注册和登录
