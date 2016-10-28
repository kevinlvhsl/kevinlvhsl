<template lang="jade">
.oprite-btn(@click="changeShow", :class="{hide: !isShow}")
    .defa
        i
        i
        i
    .strong
        em
        em
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        changeStatus: {
            type: Function,
        }
    },
    data () {
        return {
            msg: 'Welcome to kevin’ personal zone'
        }
    },
    methods: {
        changeShow () {
            this.changeStatus()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.oprite-btn
        position: fixed
        z-index: 1099
        top: 20px
        right: 80px
        height: 40px
        width: 40px
        background-color: transparent
        &.hide
            .strong
                height: 0
                border: 0
                em
                    transition: .5s
                    transform: rotate(-15deg)
                    opacity: 0
            .defa
                height: 100%
                i
                    opacity: 1
        .strong,
        .defa
            position: absolute
            width: 100%
            transition: all 1s, border 0.1s
        .defa
            height: 0
            display: flex
            justify-content: space-around
            flex-direction: column
            text-align: center
            &:hover
                animation: tada 1s
            i
                display: inline-block
                height: 3px
                width: 90%
                background-color: #575656
                opacity: 0
                transition: opacity .5s
        .strong
            height: 100%
            border-radius: 100%
            border: 2px solid #575656
            &:hover
                transform: rotate(180deg)
            em
                position: absolute
                top: calc(50% - 2px)
                background-color: #575656
                transition: transform .5s
                width: 74%
                left: 13%
                height: 2px
                &:nth-child(1)
                    transform: rotate(45deg)
                &:nth-child(2)
                    transform: rotate(-45deg)
</style>
