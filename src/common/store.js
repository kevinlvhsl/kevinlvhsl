export default class {
    constructor(storage) {
        this.storage = storage
    }

    pre (key) {
        const now = new Date()
        const year = (now.getFullYear()).toString()
        const month = (now.getMonth() + 1).toString()
        const day = (now.getDate()).toString()
        const date = year + month + day

        return `kevinBlog__${key}__${date}`
    }

    get (key = '') {
        const value = JSON.parse(this.storage.getItem(this.pre(key)))

        if (value) return value.data
        return null
    }

    set (key, value) {
        this.storage.setItem(this.pre(key), JSON.stringify({ data: value }))
    }

    remove (key) {
        this.storage.removeItem(this.pre(key))
    }
}
