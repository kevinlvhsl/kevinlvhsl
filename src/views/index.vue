<template lang="jade">
#pg-index
    .container

        //- h1.title WEB FRONT DEVELOPOMENT
        img.headimg(src="~assets/headimg.jpg")
        h3 KEVIN大叔
        h2 前端开发菜鸟、VUEJS、微信小程序
        //- div(id="demo2" v-href:o="'http://google.com'") click me to open new tab to google
        ul
            li()
                a.github(target="_blank" href="https://github.com/kevinlvhsl" title="github")
                    //- cite
                    //-     img(src="~assets/github.png" width="32" height="32" align="absmiddle")
                a.zhihu(target="_blank" href="http://weibo.com/u/3037846237?source=blog" title="知乎")
                    //- cite
                    //-     img(src="~assets/zhihu.png" width="32" height="32" align="absmiddle")
                a.weibo(target="_blank" href="http://weibo.com/u/3037846237?source=blog")
                    //- cite
                    //-     img(src="~assets/weibo.png" width="32" height="32" align="absmiddle")
        //- div
        //-     el-button(:disabled="true", @click="alert(1)") 默认按钮
        //-     el-button(type="primary", :loading="true") 加载中
    .footer
        .msg 友情链接
</template>

<script>

import api from '../api'

export default {
    name: 'index',
    components: {
    },
    data () {
        return {
            radio: 0,
        }
    },
    methods: {

    },
    beforeDistory () {
    },
    mounted () {
        // api.loginAuthorize()
    }
}
</script>
<style lang="sass">
@import '../sass/main.sass'
#pg-index
    height: 100%
    min-height: 100vh
    text-align: center
    .container
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        height: calc(100vh - 180px)
        position: relative
        padding: 100px auto 30px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        &:after
            content: ''
            position: absolute
            width: 0
            height: 0
            bottom: 0
            left: 0
            border-style: solid
            border-width: 5rem 50vw 0
            border-color: transparent rgba(244, 244, 244,.7)
        ul
            margin: 16px auto
            li
                a
                    display: inline-block
                    vertical-align: middle
                    width: 4rem
                    height: 4rem
                    margin: 10px
                    opacity: .7
                    transition: all .2s ease
                    background:
                        size: 100% 100%
                        repeat: no-repeat
                        position: center center
                    &:hover
                        opacity: 1
                    &.github
                        background-image: url('~assets/github.png')
                        background-size: 90% 90%
                        &:hover
                            background-image: url('~assets/github-hover.png')
                            background-size: 100% 100%
                    &.zhihu
                        background-image: url('~assets/zhihu.png')
                        &:hover
                            background-image: url('~assets/zhihu-hover.png')
                    &.weibo
                        background-image: url('~assets/weibo.png')
                        &:hover
                            background-image: url('~assets/weibo-hover.png')
        .headimg
            height: 10rem
            width: 10rem
            display: block
            margin: 0 auto
            border: 4px solid #fff
            border-radius: 50%
            transform-origin: center center
            transition: transform 1s
            &:hover
                transform: rotate(200deg)
        h3
            line-height: 2.5em
        h2
            font-size: 20px
            line-height: 3em
        // .title
        //     margin-left: 20px
        //     padding-right: 4px
        //     line-height: 54px
        //     font: bold 200% Consolas, Monaco, monospace
        //     width: 21ch
        //     font-size: 50px
        //     color: #575656
        //     border-right: 1pt solid
        //     overflow: hidden
        //     white-space: nowrap
        //     animation: typing 5s 1s steps(21) 100, caret 1s steps(1) infinite
    .footer
        height: 100px
        width: 100%
        border: 1px solid red
        background-color: rgba(244, 244, 244, .7)
</style>
