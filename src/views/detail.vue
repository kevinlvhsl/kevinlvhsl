<template lang="jade">
#pg-detail
    | {{currBlog.title}}

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

</style>
