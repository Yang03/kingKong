<template>
    <div class="login-form-box">
        <div class="error">
            <span v-if="error">{{error}}</span>
        </div>    
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
                <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <span class="login-link">
                    <router-link to="/register">还没有账号？去注册</router-link>
                </span>    
            </el-form-item>
        </el-form>
    </div>        
</template>

<script>
import { login } from '../../api/user'
export default {
    data(){
        return {
            loginForm: {
                 email:'',
                 password: ''
            },
            error: '',
            rules: {
                email: [
                    { 
                        required: true, message: '请输入邮箱地址', trigger: 'blur'
                    }, {
                        type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'
                    }
                ],
                password: [{ 
                    required: true, message: '请输入密码', trigger: 'blur' 
                }]
            }    
        }
    },
    methods: {
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                   login(this.loginForm).then((res) => {
                        //登录页面
                        if (!res.data.code) {
                            this.$router.push({
                                path: '/usage'
                            })     
                        } else {
                             this.$refs[form].resetFields()
                             this.error = res.data.message    
                        }
                   })
                }
            })   
        }
    }    
}
</script>

<style lang="stylus">
    .login-form-box 
        width 400px
        background rgba(255,255,255, 1)
        padding 40px 60px 30px 20px
        border-radius 10px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)

        .login-link a
            color #333
            padding-left 80px
        .error
          height 20px
          color #f46 
          padding 10px 30px
          font-size 14px   
    
</style>

