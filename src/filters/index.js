export function cutstr(value, len = 30) {
    let str_length = 0
    let str_len = 0
    let str_cut = ''
    if (typeof value === 'undefined') {
        console.log(value)
        value = ''
    }
    str_len = value.length
    for (let i = 0; i < str_len; i++) {
        const a = value.charAt(i)
        str_length++
        if (escape(a).length > 4) {
            // 中文字符的长度经编码之后大于4
            str_length++
        }

        str_cut = str_cut.concat(a)
        if (str_length >= len) {
            str_cut = str_cut.concat('...')
            return str_cut
        }
    }

    //  如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return value
    }
}
export function asc2char (value) {
    return String.fromCharCode(+value)
}

export function convertDate (value) {
    const o = new Date(value * 1000)
    const year = o.getFullYear()
    const month = (o.getMonth() + 1 < 10) ? '0' + (o.getMonth() + 1) : o.getMonth() + 1
    const day = (o.getDate() < 10) ? '0' + (o.getDate()) : o.getDate()
    const hour = (o.getHours() < 10) ? '0' + (o.getHours()) : o.getHours()
    const minute = (o.getMinutes() < 10) ? '0' + (o.getMinutes()) : o.getMinutes()
    return `${year}.${month}.${day} ${hour}:${minute}`
}

export function dateToCN (value) {
    const d = new Date(value * 1000)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}.${month}.${day}`
}


export function blurPhone (phone) {
    return phone ? `${phone.substr(0, 3)}****${phone.substr(-4)}` : ''
}

const MONTH = 60 * 60 * 24 * 30
const DAY = 60 * 60 * 24
const HOUR = 60 * 60
const MIN = 60

export function advanceTime (value) {
    const delta = Date.now() / 1000 - (+value)
    if (delta > MONTH * 12) {
        return `${parseInt(delta / MONTH * 12)}年以前`
    }
    if (delta > MONTH) {
        return `${parseInt(delta / MONTH)}个月以前`
    }
    if (delta > DAY) {
        return `${parseInt(delta / DAY)}天以前`
    }
    if (delta > HOUR) {
        return `${parseInt(delta / HOUR)}小时以前`
    }
    if (delta >= MIN) {
        return `${parseInt(delta / MIN)}分钟以前`
    }
    return '刚刚'
}
