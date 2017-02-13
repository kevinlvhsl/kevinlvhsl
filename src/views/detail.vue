<template lang="jade">
#pg-detail(@scroll="checkScrollTop")
    .header(:style="{'background-image': 'url(' + (currBlog.poster || defualtimg) + ')'}")
        .category 分类：{{currBlog.category | en2cn}}
        h1.title {{currBlog.title}}
        .desc ---- {{currBlog.desc}}
        .blog-marks
            .mark(v-for="mark in currBlog.type") {{mark}}
            .read-count 阅读次数：{{currBlog.views}}次
                .admin-editor(v-if="user" style="display:inline-block;margin-left: 30px")
                    el-button(size="small", v-if="!isEditor" @click.native="isEditor = true") 编辑
                    el-button(size="small", v-if="isEditor" @click.native="save") 保存
    .container
        vue-markdown(v-if="!isEditor", emoji=true, :source="currBlog.content")
        textarea(v-if="isEditor", v-model="currBlog.content", rows="30", style="max-width:100%;width:100%" placeholder="在这里输入内容(markdown格式)")
    back-top(ref="childbtn", target-id="#pg-detail")

</template>
<script>
import BackTop from '../components/BackTop.vue'

import BlogApi from '../api/blog'

export default {
    name: 'detail',
    data () {
        return {
            defualtimg: 'https://dn-yaotv.qbox.me/appintv_9de0d279d11d24a9308cf9af7bde1154.jpeg',
            currBlog: '',
            isEditor: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        checkScrollTop () {
            const child = this.$refs.childbtn // 获取子组件实例
            child.checkshow()
        },
        backTop () {
            document.getElementById('pg-detail').scrollTop = 0
            this.isTop = true
        },
        save () {
            const self = this
            this.$store.dispatch('updateBlog', {
                id: this.currBlog.id,
                content: this.currBlog.content,
                cb: () => {
                    self.isEditor = false
                }
            })
            // BlogApi.updateBlog(this.currBlog.id, this.currBlog.content)
            // this.$store.dispatch('saveBlog', {
            //     params: this.currBlog,
            //     cb: () => {
            //         this.$message({
            //             showClose: true,
            //             type: 'success',
            //             message: '修改成功!'
            //         })
            //         this.isEditor = false
            //     }
            // })
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        }
    },
    filters: {
        en2cn (en) {
            const labels = { frontend: '前 端', backend: '后 端', utils: '工 具', live: '生 活', other: '其 他' }
            return labels[en] || '未 知'
        }
    },
    mounted () {
        const blogId = this.$route.params.id
        console.log(blogId)
        this.$store.dispatch('getBlogItem', {
            params: blogId,
            cb: (blog) => {
                this.currBlog = blog
                // this.$message({
                //     showClose: true,
                //     type: 'success',
                //     message: '发布成功!'
                // })
                // this.$nextTick(() => {
                //     setTimeout(() => {
                //         this.$router.replace('/blogs')
                //     }, 1000)
                // })
            }
        })
    }
}
</script>
<style lang="sass">
@import '../sass/main.sass'
#pg-detail
    padding-top: 0
    overflow-x: hidden
    overflow-y: scroll
    .header
        width: 100%
        height: 90vh
        padding: 40px 0 0 30%
        color: #fff
        background:
            size: cover
            repeat: no-repeat

        .title
            font-size: 36px
            line-height: 80px
        .desc
            width: 80%
            font-size: 22px
            font-weight: 800
            color: #fff
            line-height: 50px

        .blog-marks
            .mark
                display: inline-block
                border-radius: 15px
                border: 2px solid currentColor
                height: 30px
                line-height: 30px
                padding: 0 15px
                margin-right: 20px
        .category
            padding: 10px
            font-weight: 600
            line-height: 36px
            font-size: 18px
            margin-right: 10px
        .read-count
            font-size: 16px
            width: 100%
            text-align: right
            padding-right: 10%
    .container
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        width: 90%
        margin: 5vh auto
        background-color: #fff
        padding: 24px
        min-height: 75vh
        border-radius: 10px
        word-break: break-all
        @include markdown-style()

</style>
