<template lang="jade">
#pg-login
    .form-panel
        h2 登 录
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
            el-form-item(prop='password', label="密码")
                el-input(
                    type="password",
                    placeholder="6~32(字母、数字、下划线)",
                    required,
                    minLength=6,
                    maxLength=32,
                    v-model="form.password"
                )
            el-form-item
                el-button(@click.native.prevent="") 取 消
                el-button.btn-submit(
                    type="success",
                    v-if="!success"
                    @click.native.prevent="handleLogin"
                ) 登 录



</template>
<script>

export default {
    name: 'login',
    data () {
        const checkUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else if (!/^[0-9a-zA-Z_]{5,32}$/.test(value)) {
                callback(new Error('用户名在5~32为字符之间'))
            } else {
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
        return {
            success: false,
            form: {
                userName: '',
                password: '',
            },
            dynamicRule: {
                userName: [
                    { required: true, message: '请输用户名', trigger: 'blur' },
                    { validator: checkUserName, trigger: 'blur,change' }
                ],
                password: [
                    { required: true, message: '请输密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleLogin (ev) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    console.log(this.form)
                    this.$store.dispatch('loginIn',
                        {
                            params: this.form,
                            cb: () => {
                                alert('这里是登录的回调')
                                this.success = true
                                this.$emit('onloginIn')
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: '恭喜你，登录成功!'
                                })
                                this.$nextTick(() => {
                                    setTimeout(() => {
                                        this.$router.replace('index')
                                    }, 1000)
                                })
                            }
                        })
                    // kUser.loginIn(this.form, () => {
                    //     this.success = true
                    //     this.$message({
                    //         showClose: true,
                    //         type: 'success',
                    //         message: '恭喜你，登录成功!'
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
        console.log('mounted login')
    }
}
</script>
<style lang="sass">
#pg-login
    .form-panel
        width: 40%
        max-width: 360px
        min-width: 240px
        margin: 2rem auto
        padding: 1rem
        display: block
        border-radius: 12px
        h2
            line-height: 30px
            text-align: center
            margin-bottom: 10px
            border-bottom: 1pt solid #ccc
        .btn-submit
            margin-left: 2rem

</style>