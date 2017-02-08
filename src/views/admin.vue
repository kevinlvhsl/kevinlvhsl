<template lang="jade">
#pg-admin.view
    .container
        h2 发布文章
        el-form(ref="form", :model="form", label-width="80px")
            el-form-item(label="博文名称")
                el-input(v-model="form.title")
            el-form-item(label="技术分类")
                el-select(v-model="form.category", placeholder="请选择技术分类")
                    el-option(v-for="item in labels", :label="item.name", :value="item.value")

            el-form-item(label="标签")
                el-checkbox-group(v-model="form.type")
                    el-checkbox(v-for="lb in types[form.category]", :label="lb", name="type")

            el-form-item(label="图片")
                //- el-upload(action="//localhost:8080/upload/",
                //-     v-bind:on-preview="handlePreview",
                //-     v-bind:on-remove="handleRemove",
                //-     v-bind:default-file-list="form.poster"
                //- )
                    el-button(size="small", type="primary") 点击上传
                    .el-upload__tip(slot="tip") 只能上传jpg/png文件，且不超过500kb
                input#photoFileUpload(type="file" @change="uploadFile")

            el-form-item(label="内容")
                el-radio.radio(v-model="markdown", label="1") markdown
                el-radio.radio(v-model="markdown", label="2") text/plain
                el-input(v-show="markdown === '2'", type="textarea", :rows="8" placeholder="请输入文章内容" v-model="form.desc")
                #editor(v-show="markdown === '1'", contenteditable="true")
            el-form-item
                el-button(type="primary submit", @click.native.prevent="onSubmit") 立即发布
                el-button 取消


</template>

<script>
import BlogApi from '../api/blog'

import api from '../api'

export default {
    name: 'admin',
    data () {
        return {
            labels: [
                { name: '前端', value: 'frontend' },
                { name: '后端', value: 'backend' },
                { name: '工具', value: 'utils' },
                { name: '生活', value: 'live' },
                { name: '其他', value: 'other' }
            ],
            types: {
                frontend: ['HTML5', 'CSS3', 'JS', 'VUEJS'],
                backend: ['JAVA', 'PHP', 'PYTHON'],
                utils: ['sublime', 'myeclipse'],
                live: ['篮球', '旅游'],
                other: ['八卦']
            },
            markdown: '1',
            form: {
                title: '',
                category: '',
                poster: '',
                type: [],
                desc: ''
            }
        }
    },
    methods: {
        uploadFile (e) {
            const input = e.target
            if (input.files.length > 0) {
                BlogApi.uploadFile(input, (url) => {
                    this.form.poster = url
                }, () => {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '上传出错，请换一个小图片试试!'
                    })
                })
            }
        },
        onSubmit() {
            if (this.form.title.trim() === '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '标题不能为空!'
                })
                return
            }
            this.form.html = document.getElementById('editor').innerHTML
            this.$store.dispatch('saveBlog', {
                params: this.form,
                cb: () => {
                    this.success = true
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '发布成功!'
                    })
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$router.replace('/blogs')
                        }, 1000)
                    })
                }
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        }
    },
    beforeDistory () {
    },
    created () {
        const a = document.createElement('script')
        a.onload = function () {
            console.log('加载编辑器成功')
            window.MarkdownIME = MarkdownIME
            console.log(MarkdownIME)
            MarkdownIME.Enhance(MarkdownIME.Scan(window))
            console.log('MarkdownIME:', MarkdownIME)
            MarkdownIME.Enhance(document.getElementById('editor'))
            const math = new MarkdownIME.Addon.MathAddon()
            MarkdownIME.Renderer.inlineRenderer.addRule(math)
        }
        a.src = 'http://build.laobubu.net/MarkdownIME/MarkdownIME.min.js'
        document.body.appendChild(a)
    },
    mounted () {
        // api.loginAuthorize()
    }
}
</script>
<style lang="sass">
@import '../sass/main.sass'
#pg-admin
    height: 100%
    min-height: 100vh
    text-align: center
    overflow: scroll
    .container
        height: 100%
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        padding: 30px 60px

        .el-form
            width: 80%
            margin: 0 auto
            #editor
                background-color: #fff
                height: 400px
                width: 100%
                overflow-y: scroll
                text-align: left
                font-size: 14px
                padding: 10px
                line-height: 1.4
        h2
            line-height: 60px
            font-size: 20px
</style>
