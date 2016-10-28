<template lang="jade">
#pg-index

    h1.title WEB FRONT DEVELOPOMENT
    h2 梁小军 融云科技-前端开发
    //- div(id="demo2" v-href:o="'http://google.com'") click me to open new tab to google
    h3 这里是按钮的几个东东
    div
        el-button(:disabled="true", @click="alert(1)") 默认按钮
        el-button(type="primary", :loading="true") 加载中

</template>

<script>

import api from '../api'

export default {
    name: 'index',
    components: {
    },
    data () {
        return {
            radio: 0,
        }
    },
    methods: {

    },
    beforeDistory () {
    },
    mounted () {
        // api.loginAuthorize()
    }
}
</script>
<style lang="sass">
@import '../sass/main.sass'
#pg-index
    height: 100%

    h2
        font-size: 60px
        margin-left: 10px
        line-height: 100px
    .title
        margin-left: 20px
        padding-right: 4px
        line-height: 54px
        font: bold 200% Consolas, Monaco, monospace
        width: 21ch
        font-size: 50px
        color: #575656
        border-right: 1pt solid
        overflow: hidden
        white-space: nowrap
        // animation: typing 5s 1s steps(21) 100, caret 1s steps(1) infinite

</style>
