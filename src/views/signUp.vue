<template lang="jade">
#pg-signUp
    .form-panel
        h2 注 册
        el-form(
            ref="ruleForm",
            :rules='dynamicRule',
            :model="form",
            label-width="80px",
            label-position="left",
            @submit.prevent="handleSubmit"
        )
            el-form-item(prop='userName', label="用户名")
                el-input(
                    placeholder="5~32个字符"
                    minLength=5
                    maxLength=32,
                    v-model="form.userName")
            el-form-item(prop='email', label="邮箱")
                el-input(
                    placeholder="邮箱地址(不会被公开/必须)"
                    v-model="form.email")
            el-form-item(prop='checkPass', label="密码")
                el-input(
                    type="password",
                    placeholder="6~32(字母、数字、下划线)",
                    minLength=6,
                    maxLength=32
                    v-model="form.checkPass"
                )
            el-form-item(prop='password', label="确认密码")
                el-input(
                    type="password",
                    placeholder="两次密码必须一致",
                    v-model="form.password"
                )
            el-form-item(prop="sex", label="性别")
                el-radio-group(v-model="form.sex")
                    el-radio(label="1") 帅哥
                    el-radio(label="0") 美女
            el-form-item
                el-button(@click.native.prevent="") 取 消
                el-button.btn-submit(type="primary", v-if="!success" @click.native.prevent="handleSubmit") 提 交

</template>
<script>
import api from '../api/index'

// import kUser from '../api/user'

export default {
    name: 'signUp',
    data () {
        const checkUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else if (!/^[0-9a-zA-Z_]{5,32}$/.test(value)) {
                callback(new Error('用户名在5~32为字符之间'))
            } else {
                this.$refs.ruleForm.validateField('checkPass')
                callback()
            }
        }
        const checkPassWord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (!/^[0-9a-zA-Z_]{6,32}$/.test(value)) {
                callback(new Error('密码在6~32为字符之间'))
            } else {
                callback()
            }
        }
        const checkRePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.checkPass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            success: false,
            form: {
                userName: '',
                email: '',
                checkPass: '',
                password: '',
                sex: ''
            },
            dynamicRule: {
                userName: [
                    { required: true, message: '请输用户名', trigger: 'blur' },
                    { validator: checkUserName, trigger: 'blur,change' }
                ],
                checkPass: [
                    { required: true, message: '请输密码', trigger: 'blur' },
                    { validator: checkPassWord, trigger: 'blur,change' }
                ],
                password: [
                    { required: true, message: '请输密码', trigger: 'blur' },
                    { validator: checkRePass, trigger: 'blur,change' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ]
            }
        }
    },
    methods: {
        handleSubmit (ev) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    console.log(this.form)
                    this.$store.dispatch('register', this.form)
                    // kUser.signUp(this.form, () => {
                    //     this.success = true
                    //     this.$message({
                    //         showClose: true,
                    //         type: 'success',
                    //         message: '恭喜你，注册成功!'
                    //     })
                    //     this.$emit('onloginIn')
                    //     setTimeout(() => {
                    //         this.$router.replace('index')
                    //     }, 1000)
                    // })
                } else {
                    this.$message.error('您的信息格式不正确哦，请检查!')
                    return false
                }
            })
        }
    },
    mounted () {
        console.log('mounted')
    }
}
</script>
<style lang="sass">
#pg-signUp
    .form-panel
        width: 40%
        max-width: 360px
        min-width: 240px
        margin: 2rem auto
        padding: 1rem
        display: block
        border-radius: 12px
        h2
            line-height: 34px
            text-align: center
        .btn-submit
            margin-left: 2rem

</style>