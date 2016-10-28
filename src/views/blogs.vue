<template lang="jade">
#pg-blogs
    //- .left-content
    //-     left-panel
    //- .right-content
    //-     h1 这里是文章收集列表
    //-     p
    //-         | github:
    //-         strong
    //-             a(target="_blank", href="https://github.com/kevinlvhsl") https://github.com/kevinlvhsl
    .container
        .blog-list
            el-card.item(v-for="bo in blogs", :body-style="{ padding: '0px' }")
                img.top-image(src='~assets/img1.jpg')
                .bottom-desc(style='padding: 14px')
                    h3 {{bo.title}}
                    .desc {{bo.desc}}
                    .bottom.clearfix
                        time.time {{ bo.date | dateToCN}}
                        el-button.button(type=' primary', @click="goDetail") 去看看



</template>
<script>

import LeftPanel from '../components/leftPanel.vue'

import { dateToCN } from '../filters/'

export default {
    name: 'blogs',
    components: {
        LeftPanel
    },
    data () {
        return {
            blogs: [
                {
                    id: 1,
                    date: 1477203378,
                    title: 'css实现打字效果',
                    desc: '这里主要用的技术是css的steps动画函数来实现。。。这里主要用的技术是css的steps动画函这里主要用的技术是css的steps动画函'
                },
                {
                    id: 2,
                    date: 1477353000,
                    title: 'css实现打字效果1',
                    desc: '这里主要用的技术是css的steps动画函数来实现。。。'
                },
                {
                    id: 3,
                    date: 1477523378,
                    title: 'css实现打字效果2',
                    desc: '这里主要用的技术是css的steps动画函数来实现。。。'
                }
            ]
        }
    },
    methods: {
        goDetail (id) {
            this.$router.go({ name: 'detail', params: { id } })
        }
    },
    filters: {
        dateToCN
    },
    mounted () {
        console.log(document.documentElement.scrollTop)
        let lastTop = 0
        let currTop = 0
        document.getElementById('pg-blogs').addEventListener('scroll', (e) => {
            currTop = e.target.scrollTop
            if (currTop > lastTop) {
                if (currTop > 50) {
                    // this.$emit('hideTopBar')
                    console.log('要收起顶部栏')
                }
                console.log('往下滚动ing', currTop)
            } else {
                console.log('往顶滚动', currTop)
            }
            lastTop = currTop
        })
    }
}
</script>
<style lang="sass">
#pg-blogs
    // display: flex
    // align-items: stretch
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    .left-content
        width: 280px
        height: 100%
    .right-content
        flex: 1
    .container
        width: 80%
        margin: 20px auto
        background-color: transparent
        .blog-list
            width: 80%
            margin: 0 auto
            display: flex
            flex-wrap: wrap
            // justify-content: space-around
            .item
                width: 45%
                border: 2px solid red
                margin-bottom: 20px
                &:nth-child(even)
                    margin-left: 5%
                .top-image
                    display: block
                    width: 100%
                    // height: 100%
                    max-height: 240px
                    margin: 0 auto
                .bottom-desc
                    height: 120px
                    .desc
                        margin: 8px auto
                        width: 260px
                        text-overflow: ellipsis
                        overflow: hidden
                        display: -webkit-box
                        -webkit-line-clamp: 2
                        -webkit-box-orient: vertical
                        word-break: break-all
                    .button
                        float: right
                        margin-right: 20px
                        &:after
                            clear: both


</style>