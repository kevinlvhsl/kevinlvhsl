<template lang="jade">
#pg-detail
    h2.title {{currBlog.title}}
    .container
        .blog-html(v-if="!!currBlog.html" v-html="currBlog.html ? currBlog.html : ''")
        p.desc(v-if="currBlog.desc") {{currBlog.desc}}

    //- bolg.set('title', obj.title)
    //-     bolg.set('category', obj.category)
    //-     bolg.set('desc', obj.desc)
    //-     bolg.set('poster', obj.poster)
    //-     bolg.set('type', obj.type)
    //-     bolg.set('date', Math.floor(Date.now() / 1000))
</template>
<script>
export default {
    name: 'detail',
    data () {
        return {
            currBlog: ''
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
    .title
        font-size: 32px
        line-height: 80px
        text-align: center
    .container
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        width: 90%
        margin: 0 auto
        background-color: #fff
        padding: 24px
        min-height: 75vh
        border-radius: 10px
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
</style>
