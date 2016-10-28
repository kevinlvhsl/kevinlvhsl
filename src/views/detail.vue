<template lang="jade">
#pg-detail
    | afasfd
</template>
<script>
export default {
    name: 'detail',
    data () {
        return {}
    },
    mounted () {
        const blogId = this.$route.params.id
        console.log(blogId)
    }
}
</script>
<style lang="sass">

</style>