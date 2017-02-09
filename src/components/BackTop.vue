<template lang="jade">
.backtop(v-show="!isTop")
    a(@click="goTop" v-bind:class="{ hide: isTop }")

</template>
<script>

export default {
    props: {
        targetId: {
            type: String,
            default: '.view'
        },
        minheight: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            isTop: true
        }
    },
    methods: {
        goTop () {
            document.querySelector(this.targetId).scrollTop = 0
            this.isTop = true
        },
        checkshow () {
            if (document.querySelector(this.targetId).scrollTop > this.minheight) {
                this.isTop = false
            } else {
                this.isTop = true
            }
        }
    },
    mounted () {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
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
        transition: all .2s
        &.hide
            transition-delay: .5s
            bottom: -60px
            opacity: 0
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
</style>
