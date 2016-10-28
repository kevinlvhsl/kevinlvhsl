import AV from './index'
export default class Todo extends AV.Object {
    // constractor(){
    //     super()
    // }
    static getQuery () {
        return new AV.Query(this.name)
    }
    addOneTodo (obj, cb) {
        this.set('title', obj.title)
        this.set('content', obj.content)
        this.save().then(function (todo) {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + todo.id)
            cb && cb(todo)
        }, function (error) {
            // 失败之后执行其他逻辑
            console.log('Failed to create new object, with error message: ' + error.message)
        })
    }
}
// Todo.name = 'Todo'
AV.Object.register(Todo)