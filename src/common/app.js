import Store from './store'

export default {
    startTime: Date.now(),
    isLocalIp: /192|10|127/.test(location.host),
    isLocal: /localhost|192|10|127/.test(location.host),
    isProd: /mobile.wx.yiheshanghai.com/.test(location.hostname),
    isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    userInfo: {},

    ls: new Store(localStorage),
    ss: new Store(sessionStorage),
    log (msg) {
        if (this.isProd) return
        let time = Date.now() - this.startTime
        time = time < 1000 ? `[${time}ms]` : `[${(time / 1000).toFixed(2)}s]`
        console.log(time, msg)
    },
    hideLoading () {
        document.querySelector('#loading').style.display = 'none'
    },
    showLoading () {
        document.querySelector('#loading').style.display = 'block'
    },
    pop (msg = '网络不给力，请稍后再试试吧', delay = 3000, cb = false) {
        let el = document.querySelector('#App-pop')

        if (el) {
            // update
            el.innerHTML = msg
            el.style.display = 'block'
            el.classList.remove('hide')
        } else {
            // create
            el = document.createElement('div')
            el.id = 'App-pop'
            el.innerHTML = msg
            document.body.appendChild(el)
        }

        setTimeout(() => {
            el.classList.add('hide')
            el.style.display = 'none'
            cb && cb()
        }, delay)
    },
    pop2 (msg = '网络不给力，请稍后再试试吧', delay = 3000, cb = false) {
        let el = document.querySelector('#App-pop')

        document.body.style.pointerEvents = 'none'
        if (el) {
            // update
            el.innerHTML = msg
            el.classList.remove('hide')
        } else {
            // create
            el = document.createElement('div')
            el.id = 'App-pop'
            el.innerHTML = msg
            document.body.appendChild(el)
        }

        el.style.display = 'block'

        setTimeout(() => {
            document.body.style.pointerEvents = 'auto'
            el.style.display = 'none'
            cb && cb()
        }, delay)
    },
    hidePop () {
        const el = document.querySelector('#App-pop')
        if (!el) return

        document.body.style.pointerEvents = 'auto'
        el.style.display = 'none'
    },
    go (hash, refresh = false) {
        const href = location.href.split('#')[0].split('?')
        let searchParamString = ''

        if (href[1]) {
            const paramArr = href[1].split('&')
            const paramObj = {}

            paramArr.forEach((v, k) => {
                const arr = v.split('=')
                paramObj[arr[0]] = arr[1]
            })

            if (refresh) paramObj['_t'] = new Date().getTime()

            searchParamString += '?'

            for (const key in paramObj) {
                searchParamString += `${key}=${paramObj[key]}&`
            }

            searchParamString = searchParamString.slice(0, searchParamString.length - 1)
        } else if (refresh) {
            searchParamString = `?_t=${new Date().getTime()}`
        }

        location.href = `${href[0]}${searchParamString}#${hash}`
    },
    share ({ title, desc, link, imgUrl, success, cancel }) {
        const successCb = function () {
            success && success()
        }
        const cancelCb = function () {
            cancel && cancel()
        }

        wx.ready(() => {
            wx.onMenuShareTimeline({ title, link, imgUrl, successCb, cancelCb })
            wx.onMenuShareAppMessage({ title, desc, link, imgUrl, successCb, cancelCb })
        })
    },
    random (start, end) {
        return Math.floor(start + Math.random() * (end - start + 1))
    },
    queryHref (key) {
        if (!location.href.split('?')[1]) return ''

        const params = location.href.split('?')[1].split('#')[0].split('&')
        const res = params.find(v => v.split('=')[0] === key)

        return res ? res.split('=')[1] : ''
    }
}

