<template lang="jade">
#pg-admin.view
    .container
        h1 发布文章

        el-form(ref="form", :model="form", label-width="80px")
            el-form-item(label="标题：")
                el-input(v-model="form.title")
            el-form-item(label="分类：")
                el-select(v-model="form.category", placeholder="请选择技术分类")
                    el-option(v-for="item in labels", :label="item.name", :value="item.value")

            el-form-item(label="标签：")
                el-checkbox-group(v-model="form.type")
                    el-checkbox(v-for="lb in types[form.category]", :label="lb", name="type")

            el-form-item(label="图片：" style="text-align:left")
                //- el-upload(action="//localhost:8080/upload/",
                //-     v-bind:on-preview="handlePreview",
                //-     v-bind:on-remove="handleRemove",
                //-     v-bind:default-file-list="form.poster"
                //- )
                    el-button(size="small", type="primary") 点击上传
                    .el-upload__tip(slot="tip") 只能上传jpg/png文件，且不超过500kb
                input#photoFileUpload(type="file" @change="uploadFile")
                img.preview-poster(v-if="form.poster", :src="form.poster")
                //- i.el-icon-delete(v-if="form.poster", @click="form.poster = ''")
                el-button(v-if="form.poster", :plain="true" type="danger", size="small", @click.native.prevent="form.poster = ''") 删除
            el-form-item(label="摘要：")
                el-input(type="textarea", :rows="2", v-model="form.desc", :minlength="1", :maxlength="30", placeholder="简单描述(1~30字)")
            el-form-item(label="内容：")
            .content-editor
                .left-editor
                    textarea(v-model="form.content", rows="20", placeholder="在这里输入内容(markdown格式)")
                .right-preview
                    vue-markdown( emoji=true, :source="form.content")
            el-form-item
                el-button(type="primary submit", @click.native.prevent="onSubmit") 立即发布
                el-button 取消


</template>

<script>
import BlogApi from '../api/blog'

// import VueMarkdown from 'vue-markdown'

export default {
    name: 'admin',
    data () {
        return {
            lock: false,
            source: new Date().toLocaleTimeString(),
            labels: [
                { name: '前端', value: 'frontend' },
                { name: '后端', value: 'backend' },
                { name: '工具', value: 'utils' },
                { name: '生活', value: 'live' },
                { name: '其他', value: 'other' }
            ],
            types: {
                frontend: ['HTML5', 'CSS3', 'JS', 'VUEJS', 'ANGULARJS', 'REACTJS'],
                backend: ['JAVA', 'PHP', 'PYTHON', 'NODEJS'],
                utils: ['sublime', 'myeclipse', 'git', 'svn'],
                live: ['篮球', '旅游', '电影'],
                other: ['八卦', '新闻']
            },
            markdown: '1',
            form: {
                title: '',
                category: '',
                poster: '',
                type: [],
                content: '',
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
        showError (msg) {
            this.$message({
                showClose: true,
                type: 'error',
                message: msg
            })
        },
        onSubmit() {
            if (this.form.title.trim() === '') {
                this.showError('标题不能为空')
                return
            }
            if (this.form.content.trim() === '') {
                this.showError('内容不能为空')
                return
            }
            if (this.form.category.trim() === '') {
                this.showError('分类不能为空')
                return
            }
            if (this.lock) return
            this.lock = true
            this.$store.dispatch('saveBlog', {
                params: this.form,
                cb: () => {
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '发布成功!'
                    })
                    this.lock = false
                    setTimeout(() => {
                        this.$router.replace('/blogs')
                    }, 500)
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
    mounted () {
        setInterval(() => {
            this.source = new Date().toLocaleTimeString()
        }, 1000)
        // api.loginAuthorize()
    }
}
</script>
<style lang="sass">
@import '../sass/main.sass'
$themeBlue: #20a0ff
#pg-admin
    height: 100%
    min-height: 100vh
    text-align: center
    overflow-y: scroll
    .container
        min-height: 100%
        background: url('//dn-lay.qbox.me/build/single-page/images/mask_f70d8a0.png')
        padding: 20px

        h1
            line-height: 60px
            font-size: 20px
        .el-form
            width: 80%
            margin: 0 auto
            .el-form-item
                margin-bottom: 10px
            #photoFileUpload
                color: #fff
                // background-color: $themeBlue
                border-radius: 3px
                line-height: 30px
            ::-webkit-file-upload-button
                padding: .3em .6em
                line-height: 26px
                border-radius: 6px
                border: 1px solid $themeBlue
                background: #f0f3f9
                color: #34538b
            .preview-poster
                height: 36px
                width: 50px
                vertical-align: middle
                margin-right: 20px
            .el-icon-delete
                height: 30px
                margin-left: 20px
            // #editor
            //     background-color: #fff
            //     height: 400px
            //     width: 100%
            //     overflow-y: scroll
            //     text-align: left
            //     font-size: 14px
            //     padding: 10px
            //     line-height: 1.4
            .content-editor
                width: 100%
                margin-bottom: 30px
                min-width: 600px
                min-height: 300px
                display: flex
                flex-direction: rows
                align-items: stretch
                text-align: left
                .left-editor
                    width: 50%
                    textarea
                        padding: 10px
                        height: 100%
                        width: 100%
                .right-preview
                    padding: 15px
                    background-color: rgba(255 ,255 ,255 ,.4)
                    border: 2px solid #eee
                    width: 50%
                    @include markdown-style()

</style>
