<template lang="jade">
#pg-index
    .info-container

        h1.title WEB FRONT DEVELOPOMENT
        h2 前端开发菜鸟
        //- div(id="demo2" v-href:o="'http://google.com'") click me to open new tab to google
        h3 sdafsdfsdf
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
        div
            el-button(:disabled="true", @click="alert(1)") 默认按钮
            el-button(type="primary", :loading="true") 加载中

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
    .info-container
        background: #f4f4f4 url(//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png)
        &:after
            content: ''
            position: absolute
            width: 0
            height: 0
            bottom: 0
            left: 0
            border-style: solid
            border-width: 5rem 50vw 0
            border-color: transparent rgba(255,255,255,.5)
        ul
            margin: 10px auto
            li
                a
                    display: inline-block
                    vertical-align: middle
                    width: 3em
                    height: 3em
                    margin: 5px
                    line-height: 3.2em
                    color: #000
                    opacity: .7
                    transition: all .2s ease
                    background:
                        size: 100% 100%
                        repeat: no-repeat
                        position: center center
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

        h2
            font-size: 30px
            margin-left: 10px
            line-height: 100px
        .title
            margin-left: 20px
            padding-right: 4px
            line-height: 54px
            font: bold 200% Consolas, Monaco, monospace
            width: 21ch
            font-size: 50px
            color: #575656
            border-right: 1pt solid
            overflow: hidden
            white-space: nowrap
            // animation: typing 5s 1s steps(21) 100, caret 1s steps(1) infinite

</style>
