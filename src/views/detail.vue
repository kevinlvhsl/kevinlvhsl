<template lang="jade">
#pg-detail(@scroll="checkScrollTop")
    h2.title {{currBlog.title}}
    .blog-marks
        | 分类：
        span.category {{currBlog.category | en2cn}} &gt;
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
    padding: 5vh 10vw
    overflow-x: hidden
    overflow-y: scroll
    .title
        font-size: 32px
        line-height: 60px
        text-align: center
    .blog-marks
        padding: 10px
        font-weight: 600
        line-height: 36px
        font-size: 14px
        .category
            font-size: 16px
            margin-right: 10px
        .mark
            display: inline-block
            background-color: #ccc
            border-radius: 5px
            color: #fff
            height: 30px
            line-height: 30px
            padding: 0 15px
            margin-right: 20px
    .container
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        width: 100%
        background-color: #fff
        padding: 24px
        min-height: 75vh
        border-radius: 10px
        word-break: break-all
        @include markdown-style()

</style>
