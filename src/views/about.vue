<template lang="jade">
#pg-about
    .container
        h1 这里是个人资料
        a.my-weibo(target="_blank" href="http://weibo.com/u/3037846237?source=blog")
            cite
                img(src="~assets/weibo.png" width="15" height="15" align="absmiddle")
                | 微博
        p 不会打篮球的前端不是一个好丈夫
        p 姓名： 梁小军
        p 岗位： 前端开发
        p 工作年限：4年
        p 工作地址：魔都
        p 感兴趣的技术：HTML5/CSS3/JavaScript、Vue、React、webpack...
        p
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
        .my-weibo
            display: inline-block
            width: 68px
            line-height: 30px
            text-align: center
            background-color: #ddd
            border-radius: 4px
            font-size: 14px
            img
                height: 16px
                width: 16px
                vertical-align: sub
        p
            font-size: 20px
            text-indent: 20px
</style>
