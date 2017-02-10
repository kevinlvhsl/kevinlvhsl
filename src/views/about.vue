<template lang="jade">
#pg-about
    .container
        h1 关于我
        hr
        h3 常常认为：不会打篮球的前端男生不是一个好丈夫
        ul.info-list
            //- li
            //-     label 昵称：
            //-     span kevin、kevinliang、kevin大叔
            //- li
            //-     label 派别：
            //-     span 前端开发
            //- li
            //-     label 嗜好：
            //-     span 电影、篮球、排球、羽毛球等等球类运动
            //- li
            //-     label 扣扣：
            //-     span 353030799
            //- li
            //-     label 伊妹儿：
            //-     span 353030799@qq.com
            //- li
            //-     label 混迹于：
            //-     span 目前在魔都
            //- li
            //-     label 摸爬滚打：
            //-     span 4年多
            //- li
            //-     label 吃饭家伙：
            //-     span HTML5/CSS3/JavaScript、Vue、React、webpack...
            //- li
            //-     label 攻占领地：
            //-     span
            //-         a(target="_blank" href="https://github.com/kevinlvhsl") https://github.com/kevinlvhsl

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
