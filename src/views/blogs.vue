<template lang="jade">
#pg-blogs.view(@scroll="checkScrollTop")
    //- .left-content
    //-     left-panel
    //- .right-content
    //-     h1 这里是文章收集列表
    //-     p
    //-         | github:
    //-         strong
    //-             a(target="_blank", href="https://github.com/kevinlvhsl") https://github.com/kevinlvhsl
    .container
        .opration-bar
            el-select(v-model="sort", placeholder="排序方式" @change="resort")
                el-option( label="阅读数最多", value="views")
                //- el-option( label="阅读数最多", value="views")

        .blog-list
            el-card.item(v-for="bo in blogs", :body-style="{ padding: '0px' }")
                .top-image
                    img(:src="bo.poster || defualtimg")
                .category
                    .tpye {{bo.category | en2cn}}
                .bottom-desc
                    h3 {{bo.title}}
                    .desc {{bo.desc}}
                    .views {{bo.views}}次
                    .bottom.clearfix(@click="goDetail(bo.id)")
                        time.time {{ bo.date | dateToCN}}
                        el-button.button(type=" primary") 去看看

        .page-box
            el-pagination(
                layout="prev, pager, next",
                :page-size="size",
                :total="listLength",
                @currentchange="changePage")
    back-top(ref="childbtn", target-id="#pg-blogs")

</template>
<script>

import BackTop from '../components/BackTop.vue'

import { dateToCN } from '../filters/'

export default {
    name: 'blogs',
    components: {
        BackTop
    },
    data () {
        return {
            defualtimg: 'https://dn-yaotv.qbox.me/appintv_eae657cf33aeb2bf01cf64a1a7331ac1.jpeg',
            size: 4,
            currPage: 1,
            isTop: true,
            sort: ''
        }
    },
    methods: {
        goDetail (bid) {
            this.$router.push({ name: 'detail', params: { id: bid } })
        },
        changePage (curr) {
            this.currPage = curr
            console.log(curr)
        },
        checkScrollTop () {
            const child = this.$refs.childbtn //获取子组件实例
            child.checkshow()
        },
        resort () {
            this.$store.dispatch('fetchBlogs', {sort: this.sort})
        }
    },
    computed: {
        blogs () {
            return this.$store.state.blogs.slice((this.currPage - 1) * this.size, this.size * this.currPage)
        },
        totalBlogs () {
            return this.$store.state.blogs
        },
        listLength () {
            return this.totalBlogs.length
        }
    },
    filters: {
        dateToCN,
        en2cn (en) {
            const labels = {frontend: '前 端', backend: '后 端', utils: '工 具', live: '生 活', other: '其 他' }
            return labels[en] || '未 知'
        }
    },
    created () {
        this.$store.dispatch('fetchBlogs', {sort: this.sort})
    },
    mounted () {
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
@import '../sass/main.sass'
$themeBlue: #20a0ff
#pg-blogs
    min-width: 1000px
    overflow-x: hidden
    overflow-y: scroll
    -webkit-overflow-scrolling: touch

    .container
        width: 80%
        margin: 20px auto
        background-color: transparent
        display: flex
        flex-direction: column
        .blog-list
            flex: 1
            // min-height: 50vh
            width: 80%
            margin: 0 auto
            display: flex
            flex-wrap: wrap
            // justify-content: space-around
            .item
                width: 45%
                border: 2px solid $themeBlue
                margin-bottom: 20px
                position: relative
                &:nth-child(even)
                    margin-left: 5%
                .top-image
                    display: block
                    width: 100%
                    height: 15em
                    max-height: 240px
                    margin: 0 auto
                    img
                        width: 100%
                        height: 100%
                .category
                    position: absolute
                    top: 10px
                    left: 15px
                    height: 20px
                    font-size: 14px
                    border-radius: 3px 0 0 3px
                    width: 40px
                    line-height: 20px
                    text-indent: 5px
                    background-color: #a09b9b
                    color: #fff
                    &:after
                        position: absolute
                        content: ''
                        height: 0
                        width: 0
                        top: 0
                        right: -10px
                        border-width: 10px 0px 10px 10px
                        border-style: solid
                        border-color: transparent transparent transparent #a09b9b
                .bottom-desc
                    height: 120px
                    padding: 10px 14px
                    .views
                        position: absolute
                        bottom: 10px
                        left: 12px
                        padding-left: 24px
                        background:
                            image: u('views.png')
                            size: 20px 14px
                            position: 0px center
                            repeat: no-repeat
                    .desc
                        margin: 8px auto
                        width: 260px
                        height: 32px
                        text-overflow: ellipsis
                        overflow: hidden
                        display: -webkit-box
                        -webkit-line-clamp: 2
                        -webkit-box-orient: vertical
                        word-break: break-all
                    .button
                        float: right
                        margin-right: 10px
                        &:after
                            clear: both
        .el-pagination
            max-width: 500px
            height: 60px
            padding: 20px
            text-align: center
            background-color: lightblue
            border-radius: 12px
            margin: 0 auto
</style>
