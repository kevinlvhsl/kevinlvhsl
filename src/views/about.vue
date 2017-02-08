<template lang="jade">
#pg-about
    .container
        h1 关于我
        hr
        h3 常常认为：不会打篮球的前端男生不是一个好丈夫
        ul.info-list
            li
                label 姓名：
                span 梁小军
            li
                label 岗位：
                span 前端开发
            li
                label Q Q：
                span 353030799
            li
                label 邮箱：
                span 353030799@qq.com
            li
                label 爱好：
                span 电影、篮球、排球、羽毛球等等球类运动
            li
                label 工作年限：
                span 4年多
            li
                label 工作地址：
                span 目前在魔都
            li
                label 常用技术：
                span HTML5/CSS3/JavaScript、Vue、React、webpack...
            li
                label 技术主页：
                span
                    a(target="_blank" href="https://github.com/kevinlvhsl") https://github.com/kevinlvhsl

</template>
<script>
export default {
    name: 'about',
    data () {
        return {}
    },
    mounted () {

    }
}
</script>
<style lang="sass">
#pg-about
    text-align: center
    padding-top: 100px
    .container
        h3
            width: 70%
            margin: 0 auto
            font-size: 20px
        .info-list
            width: 78%
            margin: 0 auto
            text-align: left
            li
                font-size: 16px
                font-weight: 600
                line-height: 40px
                label
                    display: inline-block
                    width: 40%
                    text-align: right
                span
                    padding-left: 10px
</style>
