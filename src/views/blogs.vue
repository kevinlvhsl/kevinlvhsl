<template lang="jade">
#pg-blogs(@scroll="checkScrollTop")
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
                    .bottom.clearfix(@click="goDetail(bo.date)")
                        time.time {{ bo.date | dateToCN}}
                        el-button.button(type=' primary') 去看看

        .page-box
            span.demonstration 页数较少时的效果
            el-pagination(
                layout='prev, pager, next',
                :page-size='size',
                :total='listLength',
                @currentchange="changePage")
    .backtop
        a(@click="backTop" v-bind:class="{ hide: isTop }")
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
            size: 4,
            currPage: 1,
            isTop: true
        }
    },
    methods: {
        goDetail (bid) {
            this.$router.push({ name: 'detail', params: { id: bid } })
        },
        changePage (curr) {
            console.log(curr)
        },
        checkScrollTop () {
            console.log(document.getElementById('pg-blogs').scrollTop)
            if (document.getElementById('pg-blogs').scrollTop > 100) {
                this.isTop = false
            } else {
                this.isTop = true
            }
        },
        backTop () {
            document.getElementById('pg-blogs').scrollTop = 0
            this.isTop = true
        }
    },
    computed: {
        blogs () {
            return this.$store.state.blogs.slice((this.currPage - 1) * this.size, this.size * this.currPage)
        },
        listLength () {
            return this.blogs.length
        }
    },
    filters: {
        dateToCN
    },
    mounted () {
        this.$store.dispatch('fetchBlogs')
        // console.log(document.documentElement.scrollTop)
        // let lastTop = 0
        // let currTop = 0
        // document.getElementById('pg-blogs').addEventListener('scroll', (e) => {
        //     currTop = e.target.scrollTop
        //     if (currTop > lastTop) {
        //         if (currTop > 50) {
        //             // this.$emit('hideTopBar')
        //             console.log('要收起顶部栏')
        //         }
        //         console.log('往下滚动ing', currTop)
        //     } else {
        //         console.log('往顶滚动', currTop)
        //     }
        //     lastTop = currTop
        // })
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
    .backtop
        position: fixed
        bottom: 0
        right: 20px
        width: 50px
        z-index: 100
        a
            position: absolute
            display: block
            width: 100%
            height: 35px
            bottom: 0
            background: #f70
            box-shadow: 0 0 4px rgba(0,0,0,.5)
            transition: .2s
            &.hide
                transition-delay: .5s
                bottom: -60px
            &:before
                content: ''
                display: block
                position: absolute
                width: 0
                height: 0
                top: -10px
                border-style: solid
                border-width: 0 25px 10px
                border-color: transparent transparent #f70
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
        .el-pagination
            max-width: 400px
            padding: 20px
            text-align: center
            background-color: lightblue
            border-radius: 12px
            margin: 0 auto
</style>
