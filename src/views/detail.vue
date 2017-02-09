<template lang="jade">
#pg-detail(@scroll="checkScrollTop")
    h2.title {{currBlog.title}}
    back-top(ref="childbtn", target-id="#pg-detail")
    .container
        vue-markdown( emoji=true, :source="currBlog.content")
    //- bolg.set('title', obj.title)
    //-     bolg.set('category', obj.category)
    //-     bolg.set('content', obj.content)
    //-     bolg.set('poster', obj.poster)
    //-     bolg.set('type', obj.type)
    //-     bolg.set('date', Math.floor(Date.now() / 1000))
</template>
<script>
import BackTop from '../components/BackTop.vue'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'detail',
    data () {
        return {
            currBlog: ''
        }
    },
    components: {
        BackTop,
        VueMarkdown
    },
    methods: {
        checkScrollTop () {
            const child = this.$refs.childbtn //获取子组件实例
            child.checkshow()
        },
        backTop () {
            document.getElementById('pg-detail').scrollTop = 0
            this.isTop = true
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
#pg-detail
    padding: 5vh 10vw
    overflow-x: hidden
    overflow-y: scroll
    .title
        font-size: 32px
        line-height: 80px
        text-align: center
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
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        width: 90%
        margin: 0 auto
        background-color: #fff
        padding: 24px
        min-height: 75vh
        border-radius: 10px
        word-break: break-all
        p
            line-height: 1.8
            font-size: 16px
        b
            font-weight: 600
        h1
            font-size: 24px
        h2
            font-size: 22px
        h3
            font-size: 20px
        h4
            font-size: 18px
        h5
            font-size: 16px
        code
            padding: 2px 4px
            font-size: 90%
            color: #c7254e
            background-color: #f9f2f4
            border-radius: 4px
        pre
            display: block
            padding: 9.5px
            margin: 0 0 10px
            font-size: 13px
            line-height: 1.42857143
            color: #333
            word-break: break-all
            word-wrap: break-word
            background-color: #f5f5f5
            border: 1px solid #ccc
            border-radius: 4px
            code
                padding: 0
                font-size: inherit
                color: inherit
                white-space: pre-wrap
                background-color: transparent
                border-radius: 0
        blockquote
            padding: 10px 20px
            margin: 0 0 20px
            font-size: 17.5px
            background-color: #fff
            border-left: 5px solid #eee

</style>
