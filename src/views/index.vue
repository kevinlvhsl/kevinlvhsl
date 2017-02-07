<template lang="jade">
#pg-index.view
    .container
        //- h1.title WEB FRONT DEVELOPOMENT
        img.headimg(src="~assets/headimg.jpg")
        h3 KEVIN大叔
        h2 前端开发菜鸟、VUEJS、微信小程序
        ul.links
            li
                a.github(target="_blank" href="https://github.com/kevinlvhsl" title="github")
                a.zhihu(target="_blank" href="http://weibo.com/u/3037846237?source=blog" title="知乎")
                a.weibo(target="_blank" href="http://weibo.com/u/3037846237?source=blog")
                a.blogs(target="_blank" href="http://www.cnblogs.com/kevinlvhsl")
    .footer
        el-row.introduce
            el-col(:span='24')
                h2 篮球之-星翼空间
                .description
                    | 篮球之-星翼空间 是一个爱好篮球者和前端码农聚集的地方。
                    | 这里会有我的一些前端技术知识点记录 和 分享一些篮球有关的文章和资源链接
        el-row.friend-link
            el-col(:span='24')
                ul.links
                    li
                        a.blogs(target="_blank" href="http://www.cnblogs.com/kevinlvhsl")
                        a.github(target="_blank" href="https://github.com/kevinlvhsl" title="github")
                        a.zhihu(target="_blank" href="http://weibo.com/u/3037846237?source=blog" title="知乎")
                        a.weibo(target="_blank" href="http://weibo.com/u/3037846237?source=blog")
        el-row.copyright
            el-col(:span='24')
                | design & code by @kevinlvhsl,nodeJS + vuejs 感谢leancloud.cn提供存储空间



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
    display: flex
    flex-direction: column
    .container
        flex: 1
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        // height: calc(100vh - 220px)
        position: relative
        padding: 100px 50px 30px
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
            border-color: transparent rgba(51, 51, 51, .5)
        .links
            margin: 16px auto
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
    ul.links
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
                &.blogs
                    background-image: url('~assets/blogs.png')
                    &:hover
                        background-image: url('~assets/blogs-hover.png')
    .footer
        height: 140px
        width: 100%
        color: #ccc
        background-color: rgba(51, 51, 51, .5)
        .introduce
            height: 60px
            overflow: hidden
            h2
                line-height: 40px
            .description
                font-size: 14px
        .friend-link
            height: 56px
            .links
                a
                    height: 1.5rem
                    width: 1.5rem
        .copyright
            height: 20px
            color: #1d90e6
</style>
